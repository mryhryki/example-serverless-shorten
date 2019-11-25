const html = `
<!doctype html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>Shorten</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
  <style type="text/css">
    body { font-size: 24px; text-align: center; }
    input { font-size: 24px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <h1 style="text-align: center; font-size: 36px;">URL Shortener</h1>
    <div>
      <input id="url" type="text" name="url" placeholder="短縮したいURLを入力" />
    </div>
    <div style="text-align: center;">
      <button id="convert" class="waves-effect waves-light btn">変換する</button>
    </div>
    <div style="margin-top: 16px; text-align: center;">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">短縮URL</span>
          <p><a id="converted-url"></a></p>
          <p id="error-message"></p>
        </div>
      </div>
    </div>
  </div>

  <script type="text/javascript">
    const convertedUrl = document.getElementById('converted-url');
    const errorMessage = document.getElementById('error-message');

    document.getElementById('convert').onclick = () => {
      const url = document.getElementById('url').value;
      fetch('/', { method: 'POST', body: JSON.stringify({ url }) })
        .then(res => res.json())
        .then(json => {
          if (json.error) {
            convertedUrl.href = '';
            convertedUrl.textContent = '';
            errorMessage.textContent = json.error;
          } else {
            convertedUrl.href = json.url;
            convertedUrl.textContent = json.url.replace(new RegExp('^https?://'), '');
            errorMessage.textContent = '';
          }
        });
    };
  </script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
</body>
</html>
`;

module.exports.handler = async () => ({
  statusCode: 200,
  headers: { 'Content-Type': 'text/html' },
  body: html,
});
