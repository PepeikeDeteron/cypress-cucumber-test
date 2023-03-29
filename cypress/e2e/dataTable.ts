import { Given, DataTable } from "@badeball/cypress-cucumber-preprocessor";

Given("以下のユーザーテーブルが存在する", (table: DataTable) => {
  const expected = [
    ["名前", "年齢"],
    ["太郎", "20"],
    ["花子", "30"],
  ];

  assert.deepEqual(table.raw(), expected);
});
