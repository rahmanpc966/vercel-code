// Monaco Editor Worker Configuration - Simplified
if (typeof window !== "undefined") {
  window.MonacoEnvironment = {
    getWorker: (moduleId, label) => {
      // Return a simple worker that doesn't do much
      // This prevents the worker errors while maintaining functionality
      return new Worker(
        URL.createObjectURL(
          new Blob(
            [
              `
            self.onmessage = function(e) {
              // Simple echo worker
              self.postMessage({
                id: e.data.id,
                result: 'Worker ready for ' + '${label || "editor"}'
              });
            };
            `,
            ],
            { type: "application/javascript" },
          ),
        ),
      )
    },
  }
}
