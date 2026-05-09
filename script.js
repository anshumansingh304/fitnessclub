const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const selection = document.querySelector("[data-selection]");
const form = document.querySelector("[data-form]");
const formStatus = document.querySelector("[data-form-status]");

const syncHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 12);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  header.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation",
  );
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("open");
    header.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
  }
});

document.querySelectorAll("[data-plan]").forEach((card) => {
  card.querySelector("button").addEventListener("click", () => {
    document
      .querySelectorAll("[data-plan]")
      .forEach((item) => item.classList.remove("selected"));
    card.classList.add("selected");
    selection.textContent = `${card.dataset.plan} plan selected for your trial pass.`;
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get("name") || "there";
  const email = formData.get("email") || "Not shared";
  const goal = formData.get("goal") || "General fitness";
  const message = `Hi Fitness club Gym, I want to book a trial.%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0AGoal: ${encodeURIComponent(goal)}`;

  window.open(
    `https://wa.me/917007487089?text=${message}`,
    "_blank",
    "noopener",
  );
  formStatus.textContent = `Thanks, ${name}. Opening WhatsApp to confirm your trial.`;
  form.reset();
});
