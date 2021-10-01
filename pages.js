var pages = {
    init: function () {
        //? Assign ids to all items
        let items = document.getElementsByClassName("p_item");
        let iIndex = 0;
        for (const item of items) {
            item.id = "iIndex" + iIndex;
            iIndex++;
        }

        //? Hide all items that >15 
        for (let item of items) {
            if (parseInt(item.id.substring(6)) >= 16) { // 15
                item.style.display = "none";
            }
        }

        //? Create page buttons
        for (let i = 0; i < items.length / 16; i++) {
            let pageBtn = document.createElement("div");
            pageBtn.className = "page_buttons";
            pageBtn.id = "btnIndex" + i;
            document.getElementById("pages_container").appendChild(pageBtn);
        }
        pageBtns = document.getElementsByClassName("page_buttons")
        pageBtns[0].className += " page_btn_active";



        // Get all buttons with class="btn" inside the container
        var btns = document.getElementsByClassName("page_buttons");
        
        for (const btn of btns) {
            btn.addEventListener("click", function() {
                var current = document.getElementsByClassName("page_btn_active");
                current[0].className = current[0].className.replace(" page_btn_active", "");
                this.className += " page_btn_active";
                window.location='#';
            });

            btn.addEventListener("click", function() {
                //? Hide all items that >15 
                for (let item of items) {
                    item.style.display = "none";
                    if (parseInt(item.id.substring(6)) < 16 * (parseInt(btn.id.substring(8)) + 1) && parseInt(item.id.substring(6)) >= 16 * (parseInt(btn.id.substring(8)) + 1) - 16) {
                        item.style.display = "block";
                    }
                }
            });
        }
    }
}
window.addEventListener('DOMContentLoaded', pages.init)

//  s = s.substring(1);
