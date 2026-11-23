# Clear Head

A personal task list: Claude sorts brain dumps into it, and this app is where you see your tasks and tick them off.

- **App:** https://oghalayini.github.io/clear-head
- **Data:** Firebase project `clear-head-10cc1` (Firestore + Google sign-in)
- **Access:** only the Google account named in `firestore.rules` can read or change tasks.

## Files
| File | What it does |
|---|---|
| `index.html` | The whole app |
| `sw.js` | Lets the app open without internet |
| `manifest.webmanifest` + icons | Lets you install it on your phone and laptop |
| `firestore.rules` | Security rules. Paste into Firebase → Firestore → Rules. Not used by GitHub. |

## Updating the app
Upload the changed files to this repository (Add file → Upload files → Commit). GitHub Pages republishes in a minute or two. If the installed app still shows the old version, close it fully and open it again.
