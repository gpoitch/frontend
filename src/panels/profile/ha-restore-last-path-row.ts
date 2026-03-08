import type { TemplateResult } from "lit";
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators";
import type { HASSDomEvent } from "../../common/dom/fire_event";
import { fireEvent } from "../../common/dom/fire_event";
import "../../components/ha-md-list-item";
import "../../components/ha-switch";
import type { HaSwitch } from "../../components/ha-switch";
import type { HomeAssistant } from "../../types";

declare global {
  interface HASSDomEvents {
    "hass-restore-last-panel-path": {
      restoreLastPanelPath: HomeAssistant["restoreLastPanelPath"];
    };
  }
  interface HTMLElementEventMap {
    "hass-restore-last-panel-path": HASSDomEvent<{
      restoreLastPanelPath: HomeAssistant["restoreLastPanelPath"];
    }>;
  }
}

@customElement("ha-restore-last-path-row")
class HaRestoreLastPathRow extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  protected render(): TemplateResult {
    return html`
      <ha-md-list-item>
        <span slot="headline"
          >${this.hass.localize(
            "ui.panel.profile.restore_last_path.header"
          )}</span
        >
        <span slot="supporting-text"
          >${this.hass.localize(
            "ui.panel.profile.restore_last_path.description"
          )}</span
        >
        <ha-switch
          slot="end"
          .checked=${this.hass.restoreLastPanelPath}
          @change=${this._checkedChanged}
        ></ha-switch>
      </ha-md-list-item>
    `;
  }

  private _checkedChanged(ev: Event) {
    const restoreLastPanelPath = (ev.target as HaSwitch).checked;
    if (restoreLastPanelPath === this.hass.restoreLastPanelPath) {
      return;
    }
    fireEvent(this, "hass-restore-last-panel-path", {
      restoreLastPanelPath,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-restore-last-path-row": HaRestoreLastPathRow;
  }
}
