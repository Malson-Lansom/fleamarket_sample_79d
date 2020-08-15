class Product < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions

  belongs_to_active_hash :country

  validates :pname, :explanation, :price, :images,
  :category_id, :status, 
  :deliver, :prefecture,
  :shipping_dates, presence: true

  belongs_to :user
  belongs_to :category
  # ↓のinverse_ofの表現は削除、Rails4.1からはデフォルトで設定されているため
  # productレコード削除時に、一緒に削除したいテーブルに対して、dependent: :destroyが必要
  has_many :images, dependent: :destroy
  accepts_nested_attributes_for :images, allow_destroy: true

  enum brand_id: {
    "グッチ": 1, "プラダ": 2, "エルメス": 3, "バレンシアガ": 4, "フェンディ": 5, "ボッテガ・ヴェネタ": 6,
    "ヴァレンチノ": 7, "サン・ローラン": 8, "アルマーニ": 9,  "シャネル": 10, "その他": 11 
    # ブランド名は自由に記載してください
  }
  enum size_id: {
    "XXS以下": 1, "XS(SS)": 2, "S": 3, "M": 4, "L": 5, "XL(LL)": 6,
    "2XL(3L)": 7, "3XL(4L)": 8, "4XL(5L)以上": 9, "FREESIZE": 10
  }
  # enum size_id: {"23.0cm以下": 10, "23.0cm": 11, "23.5cm": 12, "24.0cm": 13, "24.5cm": 14, 
  #   "25.0cm": 15, "25.5cm": 16, "26.0cm": 17, "26.5cm": 18, "27.0cm": 19, "27.5cm以上": 20
  #   # 子供用サイズは別にするか、一緒にするかjsのコードを作り組む上でも検討したい点
  # }
  enum status: {"新品・未使用": 1, "未使用に近い": 2,"目立った傷や汚れなし":3,"やや傷や汚れあり":4,"傷や汚れあり":5,"全体的に状態が悪い":6}
  enum deliver: {"送料込み（出品者負担）":1, "着払い（購入者負担）":2}
  enum shipping_dates: {"1〜2日で発送":1, "2〜3日で発送":2, "4〜7日で発送":3}
  enum prefecture:{
    "北海道":1,"青森県":2,"岩手県":3,"宮城県":4,"秋田県":5,"山形県":6,"福島県":7,
    "茨城県":8,"栃木県":9,"群馬県":10,"埼玉県":11,"千葉県":12,"東京都":13,"神奈川県":14,
    "新潟県":15,"富山県":16,"石川県":17,"福井県":18,"山梨県":19,"長野県":20,
    "岐阜県":21,"静岡県":22,"愛知県":23,"三重県":24,
    "滋賀県":25,"京都府":26,"大阪府":27,"兵庫県":28,"奈良県":29,"和歌山県":30,
    "鳥取県":31,"島根県":32,"岡山県":33,"広島県":34,"山口県":35,
    "徳島県":36,"香川県":37,"愛媛県":38,"高知県":39,
    "福岡県":40,"佐賀県":41,"長崎県":42,"熊本県":43,"大分県":44,"宮崎県":45,"鹿児島県":46,"沖縄県":47
  }

  # Comment機能のアソシエーション
  has_many :comments, dependent: :destroy


end
