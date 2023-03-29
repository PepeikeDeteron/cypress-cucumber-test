Feature: Access Google
  Google 検索のテスト

  @google
  Scenario: Googleで検索する
    Given google.com にアクセスする
    Then タイトルに Google がある
    When "Cypress"で検索する
    Then 最初の検索結果を取得する
    And 検索結果が表示される
    But タイトルに "Unknown" が含まれない
