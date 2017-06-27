module.exports = template = () => {
  const template =
    `<!DOCTYPE html>
    <html>
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.4.11/c3.min.css" rel="stylesheet" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/c3/0.4.11/c3.min.js"></script>

        <script type="text/javascript">
          onReady('#chart', () => {
            const chart = c3.generate({
              data: {
                json: {0},
                keys: {
                  value: {1},
                  x: {2},
                },
                type: {7},
                x: {2},
              },
              axis: {
                x: {
                  height: 50,
                  label: {
                    text: {3},
                  },
                  tick: {
                    rotate: {6},
                    multiline: false,
                  },
                  type: "category",
                },
                y: {
                  label: {
                    text: {4},
                  },
                },
              },
              size: {
                height: 512,
              },
              title: {
                text: {5},
              },
            });
          });

          function onReady (selector, callback) {
            const intervalID = window.setInterval(() => {
              if (document.querySelector(selector)) {
                window.clearInterval(intervalID);
                callback.call(this);
              }
            }, 500);
          }
        </script>
      </head>
      <body>
        <div id="chart" />
      </body>
    </html>`;
  return template;
}
