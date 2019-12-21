# README
## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|integer|null: false|
|email|integer|null: false|
|password|integer|null: false|
|grouns_users_id|integer|null: false, foreign_key: true|

### Association
- has_many :groups_users
- has_many :groups, through:  :groups_users
- has_many :comments

## groursテーブル

|Column|Type|Options|
|------|----|-------|
|name|integer|null: false|
|comment_id|integer|null: false, foreign_key: true|
|grouns_users_id|integer|null: false, foreign_key: true|


### Association
- has_many :groups_users
- has_many :users, through:  :groups_users
- has_many :comments


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## commentsテーブル

|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|image|text||
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group