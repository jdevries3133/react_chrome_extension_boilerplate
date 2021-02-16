# No Touchy (probably)

Webpack directly copies these html files over into the `dist/` folder for you.
This is needed for the extension, because they will link to your javascript
entrypoints, but as long as you don't move your entrypoints, you won't need to
mess with these ever.
