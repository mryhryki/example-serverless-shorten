const html = `
<!doctype html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>Shorten</title>
</head>
<body>
  <input id="url" type="text" name="url" />
  <button id="convert">変換する</button>
  <div>
    <a id="converted_url"></a>
  </div>
  <script type="text/javascript">
    const convertedUrl = document.getElementById('converted_url');
    document.getElementById('convert').onclick = () => {
      const url = document.getElementById('url').value
      fetch('/', { method: 'POST', body: JSON.stringify({ url })})
        .then(res => res.json())
        .then(json =>{
          convertedUrl.href = json.url;
          convertedUrl.textContent = json.url;
        })
    }
  </script>
</body>
</html>
`;

module.exports.handler = async () => ({
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/html',
  },
  body: html,
});
