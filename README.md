# Interactives Rendering Demo

This is a 10% time project to render interactive graphics as static images. That sounds like a contradiction, but most interactives do not feature any interactivity.

This project was originally intended to address the fact that interactive graphics do not get rendered in email newsletters. Following some feedback, rendering interactive graphics statically might benefit other products too:

* We can calculate the graphic's dimensions, which could reduce content shifting on Dotcom. Currently, an interactive graphic is loaded as an `iframe` which resizes itself once rendered which shifts content.
* We can render to different breakpoints and pixel densities, letting the client decide which asset to load
* Archival
* Potentially reduced file size compared to loading the interactive and its dependent assets (fonts, CSS, scripts & images), as well as fewer requests
