```sql
    CREATE TABLE `short` (
      `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
      `short_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '短码',
      `url` varchar(255) NOT NULL COMMENT '网址',
      PRIMARY KEY (`id`)
    )
  # utf8mb4_0900_ai_ci 是MySQL 8.0引入的一种新的默认排序规则
  # 如果您使用的是MySQL 5.7或更低版本，可以尝试使用一个与之兼容的排序规则，如utf8mb4_general_ci或utf8mb4_unicode_ci。
```
