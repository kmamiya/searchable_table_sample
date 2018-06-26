# searchable_table_sample
The sample code of table with search and sort function.

サンプルデータとして [郵便番号データダウンロード - 日本郵便](http://www.post.japanpost.jp/zipcode/download.html) より、「 [読み仮名データの促音・拗音を小書きで表記するもの(zip形式)] (http://www.post.japanpost.jp/zipcode/dl/kogaki-zip.html) 」の「東京都」をダウンロードし、内容物の「 `13TOKYO.CSV` 」を `iconv -f sjis -t utf8` にてUTF-8へ変換、使用しています。

1. Download a ZIP file from http://www.post.japanpost.jp/zipcode/dl/kogaki/zip/13tokyo.zip on http://www.post.japanpost.jp/zipcode/dl/kogaki-zip.html (Japanese)
2. unzip, and convert text encoding from SJIS to UTF-8 `iconv -f sjis -t utf8 < 13TOKYO.CSV > 13tokyo.csv`
3. `npm install`
4. `npm run watch` (start webpack-dev-server)
5. access to `http://<your host IP address>/index.html`
  
