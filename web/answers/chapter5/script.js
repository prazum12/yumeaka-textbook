// 課題1: 自己紹介プログラム
const name = "アカリ";
const age = 14;
console.log("わたしは" + name + "、" + age + "歳です");

// 課題2: 年齢でメッセージを変える（この章のメイン課題）
// age の値を 10 → 14 → 17 に変えて、3パターンともテストする
if (age >= 16) {
  console.log("高校生以上だね！");
} else if (age >= 13) {
  console.log("中学生だね！");
} else {
  console.log("小学生かな？");
}

// 課題3（チャレンジ）: 「かつ」の条件（&&）
if (age >= 13 && age <= 18) {
  console.log("夢アカデミーの対象年齢だね！");
}
