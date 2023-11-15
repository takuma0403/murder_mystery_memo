# マダミス用のメモアプリを作りたいです
## jsでサクッと作ろう
#### ごめん、electron初めて使うから時間かかるかも
> 開発メモ
- 登場人物名、時間、出来事をリンクさせた情報を入力したら、自動で整列させてきれいに表示させてほしい

- 機能は、時系列準表示、場所ごとの出来事と関わった人間、をモード切替みたいにして見やすく作りたい

- 名前とか時間とか何回も打つの面倒だから、入力バーに選択バーも付けたいなあ
- 単純な箇条書きメモとかもほしいかも
- 情報の修正機能も欲しい

* ~~wsl環境で動かしたら日本語が文字化けして豆腐になる~~
  * ~~のでwindows環境にて開発する~~
 
- wslに日本語フォント入れてませんでした。すみませんでした。

> 仕様
- electronを使ってデスクトップアプリ化する
- jsonファイルを使って記録機能を付ける
- メモの表示エリアは、メモを自動整理して表のようにまとめる
  
  > - メモは人物名と行動（起こったこと）を表示する
  > - 縦軸は時間、横軸は場所、にしてメモの座標を決め、適切に配置する
  > - メモは関わった人物によって色を付ける（多分見やすい）
  > - 同じ時間、場所の出来事は縦に並べる
  > - （縦軸の幅は自動調整必要だと思う（時間帯次第で出来事の数が違うと思う））
