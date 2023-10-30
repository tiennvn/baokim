// Dropdown
const initpXDropdown = () => {
    const dropdownList = document.querySelectorAll(".px-dropdown");
    window.addEventListener("click", () => {
      dropdownList.forEach((item) => {
        item.classList.remove("active-dropdown");
      });
    });
    dropdownList.forEach((item) => {
      const dropdownValue = item.querySelector(".px-dropdown-value");
      const dropdownInput = item.querySelector(".px-dropdown-input");
      const dropdownPanelOptions = item.querySelectorAll(".px-dropdown-panel .value");
      dropdownInput.addEventListener("click", (event) => {
        event.stopPropagation();
        item.classList.toggle("active-dropdown");
      });
      dropdownPanelOptions.forEach((item) => {
        item.addEventListener("click", (event) => {
          dropdownInput.querySelector("input").value = event.target.innerHTML;
          dropdownValue.value = event.target.getAttribute("data-value");
        });
      });
    });
  };
  initpXDropdown();