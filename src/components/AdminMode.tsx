"use client";

import { useEffect, useState } from "react";

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

export function AdminMode() {
  const [enabled, setEnabled] = useState(true);
  const [selectedLabel, setSelectedLabel] = useState("No field selected");
  const [selectedText, setSelectedText] = useState("Click any outlined text or image field to inspect it here.");

  useEffect(() => {
    document.body.classList.toggle("admin-mode", enabled);

    const editables = Array.from(document.querySelectorAll<HTMLElement>(editableSelector));
    const images = Array.from(document.querySelectorAll<HTMLElement>("main .hero-photo-frame, main .project-plate, main .engineering-plate"));

    editables.forEach((node, index) => {
      node.dataset.adminEditable = "text";
      node.dataset.adminField = node.tagName.toLowerCase();
      node.contentEditable = enabled ? "true" : "false";
      node.spellcheck = false;
      node.addEventListener("focus", handleFocus);
      node.addEventListener("input", handleInput);
      node.dataset.adminIndex = String(index + 1);
    });

    images.forEach((node, index) => {
      node.dataset.adminEditable = "image";
      node.dataset.adminField = "image";
      node.dataset.adminIndex = String(index + 1);
      node.tabIndex = enabled ? 0 : -1;
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
      setSelectedLabel(describe(target));
      setSelectedText(target.innerText.trim() || "Empty field. Type here to add copy.");
    }

    function handleInput(event: Event) {
      const target = event.currentTarget as HTMLElement;
      setSelectedText(target.innerText.trim() || "Empty field. Type here to add copy.");
    }

    function handleImageSelect(event: Event) {
      const target = event.currentTarget as HTMLElement;
      setSelectedLabel(describe(target));
      setSelectedText("Image/media slot selected. Future backend will upload, crop, alt-text and publish this asset from the CMS.");
    }

    function preventAdminLinkNavigation(event: MouseEvent) {
      if (!enabled) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-admin-editable='text']")) {
        event.preventDefault();
      }
    }

    document.addEventListener("click", preventAdminLinkNavigation, true);

    return () => {
      editables.forEach((node) => {
        node.contentEditable = "false";
        node.removeAttribute("data-admin-editable");
        node.removeAttribute("data-admin-field");
        node.removeAttribute("data-admin-index");
        node.removeEventListener("focus", handleFocus);
        node.removeEventListener("input", handleInput);
      });
      images.forEach((node) => {
        node.removeAttribute("data-admin-editable");
        node.removeAttribute("data-admin-field");
        node.removeAttribute("data-admin-index");
        node.removeEventListener("click", handleImageSelect);
        node.removeEventListener("focus", handleImageSelect);
      });
      document.removeEventListener("click", preventAdminLinkNavigation, true);
      document.body.classList.remove("admin-mode");
    };
  }, [enabled]);

  return (
    <aside className="admin-shell" aria-label="Admin mode prototype">
      <div className="admin-topbar">
        <div>
          <strong>Admin preview mode</strong>
          <span>Frontend-only CMS prototype. Backend/database comes next.</span>
        </div>
        <button type="button" onClick={() => setEnabled((value) => !value)}>
          {enabled ? "Editing on" : "Editing off"}
        </button>
      </div>
      <div className="admin-panel">
        <p className="admin-kicker">Selected field</p>
        <h2>{selectedLabel}</h2>
        <p>{selectedText}</p>
        <div className="admin-actions" aria-label="Admin actions preview">
          <button type="button">Save draft</button>
          <button type="button">Replace media</button>
          <button type="button">Publish changes</button>
        </div>
        <div className="admin-map">
          <strong>Future backend model</strong>
          <span>Pages</span>
          <span>Sections</span>
          <span>Fields</span>
          <span>Media library</span>
          <span>SEO metadata</span>
        </div>
      </div>
    </aside>
  );
}
