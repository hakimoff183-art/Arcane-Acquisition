import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { App } from "./app";
import { LOGO } from "./components/logo-paths";

export function render() {
  return renderToString(<App />);
}

/** Sprite des logos, placé hors de la zone React : les tracés ne sont ni dupliqués ni embarqués dans le JavaScript. */
export function sprite() {
  return renderToStaticMarkup(
    <svg xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
      {Object.entries(LOGO).map(([k, v]) => (
        <symbol key={k} id={`logo-${k}`} viewBox={v.viewBox}>
          {v.paths.map((p, i) => (
            <path key={i} fill={p.fill} d={p.d} />
          ))}
        </symbol>
      ))}
    </svg>,
  );
}
