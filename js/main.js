// Conference Ticket Generator:
// ============================

// Selecting The Elements:
// ======================

let intro_container = document.querySelector(".intro");
let drop_area = document.querySelector(".upload_container");
let upload_image_note = document.querySelector(".upload_container + p");
let upload_section = document.querySelector(".upload");
let upload_container = document.querySelector(".upload_container");
let unloaded_container = document.querySelector(".unloaded");
let loaded_container = document.querySelector(".loaded");
let loaded_remove_btn = document.querySelector(".loaded .remove");
let loaded_change_btn = document.querySelector(".loaded .change");
let loaded_choose_btn = document.querySelector(".loaded .upload_files");
let upload_image_note_icon = document.querySelector(
  ".upload_container + p span",
);
let person_loaded_image = document.querySelector(".loaded img");
let person_card_image = document.querySelector(".person span.image");
let my_form = document.querySelector("form");
let submit_btn = document.querySelector(`[type="submit"]`);
let showing_card_container = document.querySelector(".showing_card");
let displaied_name = document.querySelector(".displaied_name");
let displaied_email = document.querySelector(".displaied_email");
let person_info_name = document.querySelector(".person_info_name");
let card_github_name = document.querySelector(
  ".person_info_github .github_name",
);

let dropped_image;
let valid_image_extention = ["image/jpeg", "image/png", "image/svg+xml"];
let Person_data;

// Drag The File Over The drop_area:
// ================================
drop_area.addEventListener("dragover", (e) => {
  if (unloaded_container.style.display !== "none") {
    drop_area.classList.add("active");
    // You Have To Prevent gragover Event Default behavior, TO Make The Browser Do The drop Event
  }
  e.preventDefault();
});

// ================================

// Drag The File Outside The drop_area:
// ====================================
drop_area.addEventListener("dragleave", (e) => {
  if (unloaded_container.style.display !== "none") {
    drop_area.classList.remove("active");
  }
});

// ====================================

// Drop The File in The drop_area:
// ===============================
drop_area.addEventListener("drop", (e) => {
  if (unloaded_container.style.display !== "none") {
    drop_area.classList.remove("active");
    dropped_image = e.dataTransfer.files[0];

    check_validation_of_image(dropped_image);
  }
  e.preventDefault();
});

// ====================================

// Upload The File in The drop_area:
// ===============================
loaded_change_btn.onclick = () => {
  loaded_choose_btn.click();
};

unloaded_container.onclick = () => {
  loaded_choose_btn.click();
};

loaded_choose_btn.addEventListener("change", (event) => {
  file = event.target.files[0];
  check_validation_of_image(file);
});

// ===============================

// Checking Function Of Validation Of The Image:
// ============================================
function check_validation_of_image(dropped_image) {
  let dropped_image_size = dropped_image.size;
  let dropped_image_type = dropped_image.type;

  if (
    valid_image_extention.includes(dropped_image_type) &&
    dropped_image_size < 500000
  ) {
    upload_image_note.classList.remove("error");
    upload_image_note_icon.classList.remove("error");
    person_loaded_image.classList.add("valid");

    // To Get The URL File:
    let new_reader = new FileReader();
    new_reader.readAsDataURL(dropped_image);

    new_reader.onload = (e) => {
      let url = e.target.result;

      person_loaded_image.setAttribute("src", url);
      person_card_image.style.backgroundImage = `url(${url})`;

      loaded_container.style.display = "block";
      unloaded_container.style.display = "none";
    };
  } else {
    upload_image_note.classList.add("error");
    upload_image_note_icon.classList.add("error");
    person_loaded_image.classList.remove("valid");
  }
}

// ============================================

// Checking Function Of Validation:
// ================================
loaded_remove_btn.onclick = () => {
  loaded_container.style.display = "none";
  unloaded_container.style.display = "block";
  person_loaded_image.classList.remove("valid");
};

// ================================

// Submiting The Form:
// ==================
my_form.onclick = (event) => {
  event.preventDefault();
};

// ==================

// Check full Name Input:
// =====================

let full_name_input = document.querySelector("#name");

full_name_input.addEventListener("blur", (e) => {
  let regex = /^[a-zA-Z ]+$/;
  if (e.target.value !== "") {
    if (regex.test(full_name_input.value)) {
      e.target.classList.add("valid");
    } else {
      e.target.classList.remove("valid");
      full_name_input.value = "";
      full_name_input.placeholder = "Please Enter A Valid Name";
    }
  } else {
    e.target.classList.remove("valid");
  }
});

// =====================

// Check GitHub Name Input:
// =====================

let githun_name_input = document.querySelector("#github_username");

githun_name_input.addEventListener("blur", (e) => {
  if (e.target.value !== "") {
    e.target.classList.add("valid");
  } else {
    e.target.classList.remove("valid");
  }
});

// =====================

// Check full Name Input:
// =====================

let email_input = document.querySelector("#email");
let email_warning = document.querySelector(".email > p");
let email_warning_icon = document.querySelector(".email > p span");

email_input.addEventListener("blur", (e) => {
  if (e.target.value !== "") {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(e.target.value)) {
      e.target.classList.add("valid");
      email_warning.style.display = "none";
      email_warning_icon.style.display = "none";
    } else {
      e.target.classList.remove("valid");
      email_warning.style.display = "flex";
      email_warning_icon.style.display = "inline-block";
      email_warning.classList.add("error");
      email_warning_icon.classList.add("error");
    }
  } else {
    e.target.classList.remove("valid");
    email_warning.style.display = "flex";
    email_warning_icon.style.display = "inline-block";
    email_warning.classList.add("error");
    email_warning_icon.classList.add("error");
  }
});

// =====================

let current_date = document.querySelector(".date");

submit_btn.addEventListener("click", () => {
  if (
    email_input.classList.contains("valid") &&
    githun_name_input.classList.contains("valid") &&
    person_loaded_image.classList.contains("valid") &&
    full_name_input.classList.contains("valid")
  ) {
    my_form.style.display = "none";
    intro_container.style.display = "none";
    upload_section.style.display = "none";
    showing_card_container.style.display = "block";

    displaied_name.innerHTML = `${full_name_input.value}!`;
    displaied_email.innerHTML = `${email_input.value}`;
    card_github_name.innerHTML = `@${githun_name_input.value}`;
    person_info_name.innerHTML = `${full_name_input.value}`;

    let time_format = {
      month: "short",
      day: "2-digit",
      year: "numeric",
    };

    current_date.innerHTML = new Date().toLocaleDateString(
      "en-US",
      time_format,
    );
  }
});
