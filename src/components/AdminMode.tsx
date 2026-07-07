"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";

type CmsState = {
  fields: Record<string, string>;
  media: Record<string, string>;
  updatedAt: string;
};

type ChangeRequest = {
  id: string;
  name: string;
  message: string;
  page: string;
  createdAt: string;
};

const editableSelector = [
  "main h1",
  "main h2",
  "main h3",
  "main p:not(.help):not([role='status'])",
  "main li",
  ".stat strong",
  ".stat span",
  "a.button",
  "a.ghost-button",
  "a.nav-cta",
  ".tile-link",
  "footer strong",
  "footer p",
  "footer a"
].join(",");

const imageSelector = "main .hero-photo-frame, main .project-plate, main .engineering-plate";

function routePrefix() {
  return window.location.pathname.replace(/\/$/, "") || "/";
}

function fieldKey(node: HTMLElement, index: number) {
  return `${routePrefix()}::${node.tagName.toLowerCase()}::${index}`;
}

function imageKey(index: number) {
  return `${routePrefix()}::image::${index}`;
}

function findAdminNode(key: string) {
  return Array.from(document.querySelectorAll<HTMLElement>("[data-admin-key]")).find((node) => node.dataset.adminKey === key) ?? null;
}

function applyMedia(node: HTMLElement, value: string) {
  const image = node.querySelector<HTMLImageElement>("img");
  if (image) {
    image.removeAttribute("srcset");
    image.removeAttribute("sizes");
    image.src = value;
    image.style.objectFit = "cover";
  } else {
    node.style.backgroundImage = `linear-gradient(135deg, rgba(33,55,78,.72), rgba(16,24,32,.82)), url("${value}")`;
    node.style.backgroundSize = "cover";
    node.style.backgroundPosition = "center";
  }
}

export function AdminMode() {
  const [enabled, setEnabled] = useState(false);
  const [adminRequested, setAdminRequested] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState("admin@hughes.local");
  const [password, setPassword] = useState("HughesAdmin2026!");
  const [status, setStatus] = useState("Checking admin session...");
  const [cmsState, setCmsState] = useState<CmsState>({ fields: {}, media: {}, updatedAt: "" });
  const [selectedLabel, setSelectedLabel] = useState("No field selected");
  const [selectedText, setSelectedText] = useState("Log in, then click an outlined text or image field to edit it.");
  const [selectedImageKey, setSelectedImageKey] = useState<string | null>(null);
  const [requestName, setRequestName] = useState("Owner feedback");
  const [requestMessage, setRequestMessage] = useState("");
  const [changeRequests, setChangeRequests] = useState<ChangeRequest[]>([]);

  const showAdminChrome = adminRequested || authenticated;
  const canEdit = enabled && authenticated;
  const exportHref = useMemo(() => authenticated ? "/api/cms/export" : undefined, [authenticated]);

  useEffect(() => {
    async function bootstrap() {
      const params = new URLSearchParams(window.location.search);
      const requested = params.has("admin") || params.has("editor") || window.location.pathname.replace(/\/$/, "") === "/admin";
      setAdminRequested(requested);

      const [sessionResponse, contentResponse] = await Promise.all([
        fetch("/api/admin/session", { cache: "no-store" }),
        fetch("/api/cms/content", { cache: "no-store" })
      ]);
      const session = await sessionResponse.json();
      const content = await contentResponse.json();
      const isAuthenticated = Boolean(session.authenticated);
      setAuthenticated(isAuthenticated);
      setEmail(session.email || "admin@hughes.local");
      setCmsState(content);
      setEnabled(requested || isAuthenticated);
      setStatus(isAuthenticated ? "Admin session active." : "Log in to edit and save content.");
    }
    bootstrap().catch(() => setStatus("Could not load admin database state."));
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    fetch("/api/cms/change-requests", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : { changeRequests: [] })
      .then((data) => setChangeRequests(data.changeRequests ?? []))
      .catch(() => setChangeRequests([]));
  }, [authenticated]);

  useEffect(() => {
    document.body.classList.toggle("admin-mode", enabled && showAdminChrome);
    document.body.classList.toggle("admin-authenticated", authenticated);

    const editables = Array.from(document.querySelectorAll<HTMLElement>(editableSelector));
    const images = Array.from(document.querySelectorAll<HTMLElement>(imageSelector));

    editables.forEach((node, index) => {
      const key = fieldKey(node, index + 1);
      if (cmsState.fields[key] !== undefined && node.innerText !== cmsState.fields[key]) {
        node.innerText = cmsState.fields[key];
      }
      if (!showAdminChrome) {
        node.contentEditable = "false";
        node.removeAttribute("data-admin-editable");
        node.removeAttribute("data-admin-field");
        node.removeAttribute("data-admin-index");
        node.removeAttribute("data-admin-key");
        return;
      }
      node.dataset.adminKey = key;
      node.dataset.adminEditable = "text";
      node.dataset.adminField = node.tagName.toLowerCase();
      node.dataset.adminIndex = String(index + 1);
      node.contentEditable = canEdit ? "true" : "false";
      node.spellcheck = false;
      node.addEventListener("focus", handleFocus);
      node.addEventListener("input", handleInput);
    });

    images.forEach((node, index) => {
      const key = imageKey(index + 1);
      if (cmsState.media[key]) applyMedia(node, cmsState.media[key]);
      if (!showAdminChrome) {
        node.removeAttribute("data-admin-editable");
        node.removeAttribute("data-admin-field");
        node.removeAttribute("data-admin-index");
        node.removeAttribute("data-admin-key");
        node.removeAttribute("tabindex");
        return;
      }
      node.dataset.adminKey = key;
      node.dataset.adminEditable = "image";
      node.dataset.adminField = "image";
      node.dataset.adminIndex = String(index + 1);
      node.tabIndex = canEdit ? 0 : -1;
      node.addEventListener("click", handleImageSelect);
      node.addEventListener("focus", handleImageSelect);
    });

    function describe(node: HTMLElement) {
      const field = node.dataset.adminField ?? node.tagName.toLowerCase();
      const index = node.dataset.adminIndex ?? "";
      return `${field.toUpperCase()} field ${index}`;
    }

    function handleFocus(event: Event) {
      const target = event.currentTarget as HTMLElement;
      setSelectedImageKey(null);
      setSelectedLabel(describe(target));
      setSelectedText(canEdit ? target.innerText.trim() || "Empty field. Type here to add copy." : "Log in to edit this field.");
    }

    function handleInput(event: Event) {
      const target = event.currentTarget as HTMLElement;
      setSelectedText(target.innerText.trim() || "Empty field. Type here to add copy.");
    }

    function handleImageSelect(event: Event) {
      const target = event.currentTarget as HTMLElement;
      setSelectedImageKey(target.dataset.adminKey ?? null);
      setSelectedLabel(describe(target));
      setSelectedText(canEdit ? "Image/media slot selected. Upload a replacement image and save it to the database." : "Log in to replace this image.");
    }

    function preventAdminLinkNavigation(event: MouseEvent) {
      if (!canEdit) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-admin-editable='text']")) event.preventDefault();
    }

    document.addEventListener("click", preventAdminLinkNavigation, true);

    return () => {
      editables.forEach((node) => {
        node.contentEditable = "false";
        node.removeAttribute("data-admin-editable");
        node.removeAttribute("data-admin-field");
        node.removeAttribute("data-admin-index");
        node.removeAttribute("data-admin-key");
        node.removeEventListener("focus", handleFocus);
        node.removeEventListener("input", handleInput);
      });
      images.forEach((node) => {
        node.removeAttribute("data-admin-editable");
        node.removeAttribute("data-admin-field");
        node.removeAttribute("data-admin-index");
        node.removeAttribute("data-admin-key");
        node.removeEventListener("click", handleImageSelect);
        node.removeEventListener("focus", handleImageSelect);
      });
      document.removeEventListener("click", preventAdminLinkNavigation, true);
      document.body.classList.remove("admin-mode");
    };
  }, [enabled, authenticated, canEdit, cmsState, showAdminChrome]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Signing in...");
    const response = await fetch("/api/admin/session", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    if (!response.ok) {
      setAuthenticated(false);
      setStatus("Login failed. Check the admin email and password.");
      return;
    }
    setAuthenticated(true);
    setEnabled(true);
    setStatus("Admin login active. You can edit and save now.");
  }

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    setAuthenticated(false);
    setEnabled(false);
    setAdminRequested(false);
    setStatus("Logged out of admin mode.");
  }

  function collectState(): Pick<CmsState, "fields" | "media"> {
    const fields: Record<string, string> = {};
    document.querySelectorAll<HTMLElement>("[data-admin-editable='text']").forEach((node) => {
      if (node.dataset.adminKey) fields[node.dataset.adminKey] = node.innerText.trim();
    });
    return { fields, media: cmsState.media };
  }

  async function saveDraft() {
    if (!authenticated) {
      setStatus("Log in before saving.");
      return;
    }
    setStatus("Saving content to database...");
    const response = await fetch("/api/cms/content", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(collectState())
    });
    if (!response.ok) {
      setStatus("Save failed. Check database configuration and admin session.");
      return;
    }
    const next = await response.json();
    setCmsState(next);
    setStatus(`Saved to database at ${new Date(next.updatedAt).toLocaleTimeString()}.`);
  }

  async function replaceMedia(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !selectedImageKey) {
      setStatus("Select an image field first, then choose a file.");
      return;
    }
    if (!authenticated) {
      setStatus("Log in before uploading media.");
      return;
    }
    setStatus("Uploading replacement image...");
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/cms/media", { method: "POST", body: formData });
    event.target.value = "";
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      setStatus(error.error || "Image upload failed.");
      return;
    }
    const data = await response.json();
    const nextMedia = { ...cmsState.media, [selectedImageKey]: data.upload.url };
    const selectedNode = findAdminNode(selectedImageKey);
    if (selectedNode) applyMedia(selectedNode, data.upload.url);
    setCmsState((current) => ({ ...current, media: nextMedia }));
    setStatus(`Image uploaded to ${data.upload.storage}. Click Save draft to store this page mapping.`);
  }

  async function importDatabase(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!authenticated) {
      setStatus("Log in before importing database JSON.");
      return;
    }
    setStatus("Importing CMS export...");
    const text = await file.text();
    event.target.value = "";
    const response = await fetch("/api/cms/import", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: text
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      setStatus(error.error || "CMS import failed.");
      return;
    }
    const imported = await response.json();
    setCmsState(imported.state);
    setChangeRequests(imported.changeRequests ?? []);
    setStatus("CMS export imported. Refresh pages to confirm the migrated content.");
  }

  async function submitChangeRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!requestMessage.trim()) {
      setStatus("Write a change request before submitting.");
      return;
    }
    const response = await fetch("/api/cms/change-requests", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: requestName, message: requestMessage, page: window.location.pathname })
    });
    if (!response.ok) {
      setStatus("Could not submit change request.");
      return;
    }
    const data = await response.json();
    setChangeRequests((current) => [data.changeRequest, ...current].slice(0, 5));
    setRequestMessage("");
    setStatus("Change request stored in the database.");
  }

  if (!showAdminChrome) return null;

  return (
    <aside className="admin-shell" aria-label="Admin editor mode">
      <div className="admin-topbar">
        <div>
          <strong>{authenticated ? "Admin editor mode" : "Admin login mode"}</strong>
          <span>{status}</span>
        </div>
        <div className="admin-topbar-actions">
          <button type="button" onClick={() => setEnabled((value) => !value)}>
            {enabled ? "Editing view on" : "Editing view off"}
          </button>
          {authenticated ? <button type="button" onClick={logout}>Log out</button> : null}
        </div>
      </div>
      <div className="admin-panel">
        {!authenticated ? (
          <form className="admin-login" onSubmit={login}>
            <p className="admin-kicker">Secure preview login</p>
            <h2>Admin panel</h2>
            <label>Email<input value={email} onChange={(event) => setEmail(event.target.value)} /></label>
            <label>Password<input value={password} onChange={(event) => setPassword(event.target.value)} type="password" /></label>
            <button type="submit">Log in</button>
            <small>Defaults are for local/client preview only. Set ADMIN_EMAIL, ADMIN_PASSWORD and ADMIN_SESSION_SECRET on Vercel.</small>
          </form>
        ) : (
          <>
            <p className="admin-kicker">Selected field</p>
            <h2>{selectedLabel}</h2>
            <p>{selectedText}</p>
            <div className="admin-actions" aria-label="Admin actions preview">
              <button type="button" onClick={saveDraft}>Save draft</button>
              <label className="admin-upload">Replace media<input type="file" accept="image/*" onChange={replaceMedia} /></label>
              <a className="admin-export" href={exportHref}>Export DB JSON</a>
              <label className="admin-upload admin-import">Import DB JSON<input type="file" accept="application/json,.json" onChange={importDatabase} /></label>
            </div>
            <form className="change-request-form" onSubmit={submitChangeRequest}>
              <strong>Request a change</strong>
              <input value={requestName} onChange={(event) => setRequestName(event.target.value)} aria-label="Requester name" />
              <textarea value={requestMessage} onChange={(event) => setRequestMessage(event.target.value)} placeholder="Type a change request for Jay to review tomorrow..." aria-label="Change request" />
              <button type="submit">Store request</button>
            </form>
            <div className="admin-map">
              <strong>Database model</strong>
              <span>Vercel Postgres or local JSON</span>
              <span>Vercel Blob or local uploads</span>
              <span>Change requests</span>
              <span>Import / export JSON</span>
            </div>
            {changeRequests.length ? (
              <div className="admin-requests" aria-label="Recent change requests">
                <strong>Recent requests</strong>
                {changeRequests.slice(0, 3).map((request) => (
                  <p key={request.id}><span>{request.page}</span>{request.message}</p>
                ))}
              </div>
            ) : null}
          </>
        )}
      </div>
    </aside>
  );
}
