# 79期生teamD 最終課題
5人チームでメルカリのクローンサイトを作成する  
制作期間：2020年7月22日ー8月14日  
本番環境: http://54.248.22.135/  
  
Basic認証  
- ID: admin_d
- PASS: firms_i
  
確認用ログインアカウント1  
- EMAIL: user_001@gmail.com
- PASS: Furima5555
  
確認用ログインアカウント2  
- EMAIL: furima77@gmail.com
- PASS: Furima7777

# アプリ説明
## ログイン
![signup](https://user-images.githubusercontent.com/61781906/90244024-ed752b00-de6a-11ea-8575-43ace1aeb9a2.gif)
新規登録はウィザード形式で、ユーザー情報、住所の順に登録いたします。  
ログインはemailとpasswordの２つの情報が必要になります。  
  
![signin](https://user-images.githubusercontent.com/61781906/90244221-49d84a80-de6b-11ea-9df6-92be3164cad5.gif)
ログイン、新規サインアップでSNS認証が使用できますが、本番環境は対応しておりません。  
  
商品の出品はマイページのサイドバー「出品する」をクリックすることで商品を出品することができます  
出品情報は必須を全て入力しなければ進めないようになっています。  
出品後は、トップページに表示されております。
  
商品詳細ページでは、出品者は、出品商品の情報編集及び、商品の削除を実行できます。  
出品者以外は、購入するボタンが表示されます。
  
カードが登録されていれば、購入を実行することができます。
カードの登録はマイページのサイドバーで実行することができますが、デフォルトで登録されているカードをお使いください。
  
最後に、必ずログアウトいただきますようお願い申し上げます。
  
# メンバー紹介
## 高橋
- スクラムマスター
- 商品購入確認ページ作成
- PAYJPによる購入機能の実装
- 購入機能の異常系調整(URL直飛び禁止)
## 富田
- 商品出品ページ作成
- 画像投稿機能の実装
- 商品出品機能の実装
- 商品削除機能の実装
## 橋本
- トップページ作成
- ヘッダー、フッター作成
- 商品一覧表示作成
## 福元
- 商品詳細ページ作成
- 商品表示の異常系調整（リンク表示調整）
## 佐野
- デプロイ担当
- DB設計、ER図
- ユーザー管理機能作成
- マイページ、ログイン、サインインページ作成
- SNS認証によるサインアップ、ログイン機能（ローカルのみ）
- パンくずリスト導入

# [ER図](https://app.diagrams.net/#G1Yr1YNttI8S3F-aIMpAhlUtLIWoQHrSVL)

## usersテーブル
|column|type|options|validations|
|------|----|-------|-----------|
|nickname|string|null: false||
|first_name|string|null: false||
|family_name|string|null: false||
|email|string|null: false, unique: true||
|password|string|null: false||
|image|string|||
|birthday|string|||
|profile|text|||

Association
- has_many: products
- has_one: postals (複数設定するならhas_many)
- has_one: creditcards
- has_many: orders (購入管理)
- has_many: comments (応用実装)
- has_many: likes (応用実装)


## postalsテーブル
|column|type|options|validations|
|------|----|-------|-----------|
|user_id|references|foreign_key||
|postal_code|string|null: false||
|prefecture|integer|null: false||
|city|string|null: false||
|address_line|string|null: false||
|apartment|string|||

Association
- belongs_to :user

## productsテーブル
|column|type|options|validations|
|------|----|-------|-----------|
|user_id|references|foreign_key||
|name|string|null: false, index: true||
|price|integer|null: false||
|explanation|text|null: false||
|status|integer|null: false||
|size_id|integer|null: false||
|brand_id|integer|||
|category_id|integer|null: false||
|shipping_status|integer|null: false||
|deliver|integer|null: false||
|prefecture|integer|null: false||
|shipping_date|integer|null: false||


Association
- belongs_to :user
- has_many : orders (購入管理)
- has_many : comments
- has_many : likes
- belongs_to :categories

## imagesテーブル
|column|type|options|validations|
|------|----|-------|-----------|
|product_id|references|foreign_key||
|image|text|null: false||

Association
- belongs_to: products

## cardsテーブル
|column|type|options|validations|
|------|----|-------|-----------|
|user_id|references|foreign_key||
|customer_id|string|null: false||
|card_id|string|null: false||

Association
- belongs_to :user
Note
- gem 'pay.jp'を使用する

## categoriesテーブル
|column|type|options|validations|
|------|----|-------|-----------|
|products_id|references|foreign_key||
|category_name|string|||
|ancestry|string|||

Association
- has_many :products
Note
- gem 'ancestry'の内容を洗い出してから作成する

## ordersテーブル(8月14日時点で未実装：管理者画面作成時の販売一覧管理用)
|column|type|options|validations|
|------|----|-------|-----------|
|user_id|references|foreign_key||
|products_id|references|foreign_key||

Association
- has_many :products
- has_many :users

## credentialテーブル
|column|type|options|validations|
|------|----|-------|-----------|
|user_id|references|foreign_key||
|provider|string|||
|uid|string|||

Associtaion
- belongs_to :user
Note
- sns credentialでログインする機能
- gem 'omniauth'の内容を洗い出して作成する

## commentsテーブル
|column|type|options|validations|
|------|----|-------|-----------|
|product_id|references|foreign_key||
|user_id|references|foreign_key||
|comment|text|||

Association
- belongs_to :user
- belongs_to :product
Note
- コメント機能、商品ーユーザーの間に作る

## likesテーブル(8月14日時点で未実装：商品評価機能)
|column|type|options|validations|
|------|----|-------|-----------|
|product_id|references|foreign_key||
|user_id|references|foreign_key||

Association
- belongs_to :user
- belongs_to :product
Note
- お気に入り機能、商品ーユーザーの間に作る