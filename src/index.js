const form = document.getElementById("feedback");
const true_url = "https://60376bfd5435040017722533.mockapi.io/form";
const false_url = "https://60376bfd5435040017722533.mockapi.io/formRej";
const checkBox = document.getElementById("checkbox");
const regName = /^[А-ЯЁа-яё]*(\s[А-ЯЁа-яё]*){2}$/i;
const regEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]$/i;
const regTel = /^\+7\s\d{3}\s\d{3}-\d{2}-\d{2}$/;

let isChecked = false;

checkBox.addEventListener("change", (event) => {
  isChecked = event.target.checked;
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  const validName = regName.test(formData.get("name"));
  const validEmail = regEmail.test(formData.get("email"));
  const validTel = regTel.test(formData.get("phone"));

  if (!validEmail || !validName || !validTel) {
    alert(`
      ${!validName ? "Введите корректное имя\r\n" : ""}
      ${!validEmail ? "Введите корретные Email\r\n" : ""}
      ${!validTel ? "Введите корретный номер телефона\r\n" : ""}
    `);
    return;
  }

  const url = isChecked ? false_url : true_url;

  const response = await fetch(url, {
    method: "POST",
    body: formData
  });

  let result = await response.json();

  if (response.status >= 200 && response.status < 400) {
    alert(result.text);
  } else if (response.status >= 400) {
    alert(`Ошибка : ${response.status}`);
  }
});

Inputmask().mask(document.querySelectorAll("input"));
