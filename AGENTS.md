<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Module boundaries
- Keep external module calls behind PlatformPorts and the mock adapter injection point so real integrations can replace demos without changing screens.
- Generate demonstration PDFs through the browser-only, dynamically loaded demo-pdf helper and label them as nonlegal examples so downloads work without implying authentic documents.
- Share demo notification read state through a useSyncExternalStore module with a stable server snapshot so navigation badges and lists agree without hydration differences.
