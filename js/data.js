let FAQ = document.querySelector(".accordion-section");
if (FAQ) {
    async function loadFAQ() {
        const url = "https://yulchmalan.github.io/kp-source/qAndA.json"; 
        try {
            const response = await fetch(url);
            const data = await response.json();
            const faq = data.faq;
    
            const columns = document.querySelectorAll("#questions .col");
    
            faq.forEach((item, index) => {
            const article = document.createElement("article");
            article.classList.add("accordion-item");
    
            const questionSection = document.createElement("section");
            questionSection.classList.add("question");
    
            const question = document.createElement("h3");
            question.textContent = item.question;
    
            const icons = `
                <svg height="30" width="30" class="icon-lg icon">
                <use href="images/icons.svg#plus-30"></use>
                </svg>
                <svg height="30" width="30" class="icon-md icon">
                <use href="images/icons.svg#plus-30"></use>
                </svg>
                <svg height="24" width="24" class="icon-sm icon">
                <use href="images/icons.svg#plus-24"></use>
                </svg>
            `;
    
            questionSection.innerHTML += icons;
            questionSection.prepend(question);
    
            const answerSection = document.createElement("section");
            answerSection.classList.add("answer");
    
            const answer = document.createElement("p");
            answer.classList.add("font-size");
            answer.textContent = item.answer;
    
            answerSection.appendChild(answer);
    
            article.appendChild(questionSection);
            article.appendChild(answerSection);
    
            const col1Count = columns[0].children.length;
            const col2Count = columns[1].children.length;
    
            if (col1Count <= col2Count) {
                columns[0].appendChild(article);
            } else {
                columns[1].appendChild(article);
            }
            });
    
            initializeAccordion();
        } catch (error) {
            console.error("Не вдалось завантажити питання:", error);
        }
    }
    
    function initializeAccordion() {
        const accordionItems = document.querySelectorAll(".accordion-item");
        if (accordionItems) {
            accordionItems.forEach((item) => {
                item.addEventListener("click", () => {
                    accordionItems.forEach((otherItem) => {
                        const icon = otherItem.querySelectorAll('.icon use');
                        if (otherItem !== item) {
                            otherItem.classList.remove("active");
                            if (icon) {
                            icon.forEach((inactiveIcon) => {
                                const href = inactiveIcon.getAttribute("href");
                                inactiveIcon.setAttribute("href", href.replace("minus", "plus"));
                            });
                            }
                        }
                    });
                    item.classList.toggle("active");
    
                    const activeIcon = item.querySelectorAll('.icon use');
                    if (activeIcon) {
                        activeIcon.forEach((icon) => {
                            const href = icon.getAttribute("href");
                            if (item.classList.contains("active")) {
                            icon.setAttribute("href", href.replace("plus", "minus"));
                            } else {
                            icon.setAttribute("href", href.replace("minus", "plus"));
                            }
                        });
                    }
                });
            });
        }
    }
    
    document.addEventListener("DOMContentLoaded", loadFAQ);
}

let subPlans = document.querySelector(".subscription");
if (subPlans) { 
    async function loadSubscriptionPlans() {
        const url = "https://yulchmalan.github.io/kp-source/sub.json"; 
        try {
            const response = await fetch(url);
            const plans = await response.json();
        
            const pricingContainer = document.getElementById("pricingContainer");
            const toggleSub = document.getElementById("toggleSub");
        
            if (!pricingContainer || !toggleSub) return;
        
            pricingContainer.innerHTML = "";
        
            plans.forEach((plan) => {
            const card = document.createElement("div");
            card.classList.add("card");
        
            card.innerHTML = `
                <div class="text-content">
                <h3>${plan.name} План</h3>
                <p class="font-size">${plan.content}</p>
                </div>
                <div>
                    <p class="price font-size">
                    <span class="big-num">${plan.priceMonth.split('/')[0]}</span>
                    <span class="duration">/місяць</span>
                    </p>
                    <div class="controls">
                    <a class="btn btn-secondary font-size" href="#">Розпочати</a>
                    <a class="btn btn-primary font-size" href="#">Вибрати план</a>
                    </div>
                </div>
            `;
        
            pricingContainer.appendChild(card);
        });
        
        const updateCardSizes = () => {
            const cards = pricingContainer.querySelectorAll(".card");
            const totalCards = cards.length;
    
            if (window.matchMedia("(min-width: 1024px)").matches) {
                let cardWidth = "100%"; 
        
                if (totalCards % 3 === 0) {
                    cardWidth = "calc(33% - 20px)";
                } else if (totalCards % 2 === 0) {
                    cardWidth = "calc(50% - 15px)";
                }
        
                cards.forEach((card) => {
                    card.style.width = cardWidth;
                });
            } else {
                cards.forEach((card) => {
                    card.style.width = "100%";
                });
            }
            };
            updateCardSizes();
        
            window.addEventListener("resize", updateCardSizes);
        
            const toggleBtns = toggleSub.querySelectorAll(".toggle-btn");
            const toggleBtnMonthly = document.getElementById("toggleMonthly");
            const toggleBtnYearly = document.getElementById("toggleYearly");
        
            toggleSub.addEventListener("click", (e) => {
            const clickedBtn = e.target;
        
            if (clickedBtn === toggleBtnMonthly || clickedBtn === toggleBtnYearly) {
                toggleBtns.forEach((btn) => btn.classList.remove("active"));
                clickedBtn.classList.add("active");
        
                const isMonthly = clickedBtn === toggleBtnMonthly;
        
                const cards = pricingContainer.querySelectorAll(".card");
                cards.forEach((card, index) => {
                const priceElement = card.querySelector(".big-num");
                const durationElement = card.querySelector(".duration");
        
                if (priceElement && durationElement) {
                    const plan = plans[index];
                    const price = isMonthly
                    ? plan.priceMonth.split('/')[0]
                    : plan.priceYear.split('/')[0];
        
                    priceElement.textContent = price;
                    durationElement.textContent = isMonthly ? "/місяць" : "/рік";
                }
                });
            }
            });
        } catch (error) {
            console.error("Не вдалось завантажити плани:", error);
        }
    }
    document.addEventListener("DOMContentLoaded", loadSubscriptionPlans);
}
    
let subTable = document.querySelector("#subscription-table");
if (subTable) {
    async function loadSubscriptionTable() {
        const url = "https://yulchmalan.github.io/kp-source/sub.json"; 
        try {
            const response = await fetch(url);
            const plans = await response.json();
        
            const subscriptionContainer = document.querySelector(".subscription-container");
            const table = document.querySelector("table");
            const tableHead = table.querySelector("thead");
            const tableBody = table.querySelector("tbody");
            const toggleTable = document.getElementById("toggleTable");
        
            if (!subscriptionContainer || !table || !toggleTable) return;
        
            const generateToggleButtons = () => {
            toggleTable.innerHTML = ""; 
            plans.forEach((plan, index) => {
                const button = document.createElement("div");
                button.classList.add("toggle-btn", "font-size");
                if (index === 0) button.classList.add("active"); 
                button.textContent = plan.name;
                button.dataset.index = index; 
                toggleTable.appendChild(button);
            });
            };
        
            const populateSubscriptionContainer = (planIndex) => {
            const plan = plans[planIndex];
            const groups = subscriptionContainer.querySelectorAll(".text-group");
            const features = plan.features;
        
            if (groups.length > 0) {
                groups[0].querySelector(".font-size:last-child").textContent = plan.priceMonth;
                Object.values(features).forEach((value, i) => {
                if (groups[i + 1]) {
                    groups[i + 1].querySelector(".font-size:last-child").textContent = value;
                }
                });
            }
            };
        
            const populateTableHead = () => {
            tableHead.innerHTML = ""; 
        
            const tr = document.createElement("tr");
        
            const thFeatures = document.createElement("th");
            thFeatures.textContent = "Переваги";
            tr.appendChild(thFeatures);
        
            plans.forEach((plan, index) => {
                const th = document.createElement("th");
                th.textContent = plan.name;
                if (index === 1) th.innerHTML = `<span class="popular">${plan.name}</span>`; 
                tr.appendChild(th);
            });
        
            tableHead.appendChild(tr);
            };
        
            const populateTableBody = () => {
            tableBody.innerHTML = ""; 
        
            const featureNames = Object.keys(plans[0].features);
            const rows = [
                { title: "Ціна", values: plans.map(plan => plan.priceMonth) },
                ...featureNames.map((name) => ({
                title: name,
                values: plans.map(plan => plan.features[name]),
                })),
            ];
        
            rows.forEach((row) => {
                const tr = document.createElement("tr");
                const tdTitle = document.createElement("td");
                tdTitle.textContent = row.title;
                tr.appendChild(tdTitle);
        
                row.values.forEach((value) => {
                const td = document.createElement("td");
                td.textContent = value;
                tr.appendChild(td);
                });
        
                tableBody.appendChild(tr);
            });
            };
    
            const adjustColumnWidths = () => {
            const totalColumns = plans.length + 1; 
            const columnWidthPercentage = 100 / totalColumns; 
        
            table.style.overflowX = "auto"; 
        
            const thElements = table.querySelectorAll("th");
            const tdElements = table.querySelectorAll("td");
        
            thElements.forEach((th) => {
                th.style.width = `calc(${columnWidthPercentage}%)`;
            });
        
            tdElements.forEach((td) => {
                td.style.width = `calc(${columnWidthPercentage}%)`;
            });
            };
        
            generateToggleButtons();
            populateSubscriptionContainer(0); 
            populateTableHead();
            populateTableBody();
            adjustColumnWidths(); 
        
            toggleTable.addEventListener("click", (e) => {
            const target = e.target;
            if (target.classList.contains("toggle-btn")) {
                const index = parseInt(target.dataset.index, 10);
        
                toggleTable.querySelectorAll(".toggle-btn").forEach((btn) => {
                btn.classList.remove("active");
                });
                target.classList.add("active");
        
                populateSubscriptionContainer(index);
            }
            });
        } catch (error) {
            console.error("Не вдалось завантажити таблицю:", error);
        }
    }
        
    document.addEventListener("DOMContentLoaded", loadSubscriptionTable);
}