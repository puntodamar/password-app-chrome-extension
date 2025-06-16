import {Controller} from "@hotwired/stimulus";

class SearchController extends Controller {
    static targets = ["input", "item", "clearButton"]
    
    search() {
        const searchText = this.inputTarget.value.trim().toLocaleLowerCase();
        
        if(!searchText.length) {
            this.showItems()
            return
        }
        
        this.itemTargets.forEach((item) => {
            item.hidden = !item.textContent.trim().toLocaleLowerCase().includes(searchText);
        })
        
        // const visibleItems = this.itemTarget.filter((item) => !item.hidden);
        const visibleItems = this.itemTargets.filter((item) => !item.hidden);
        
        if (visibleItems.length === 1) {
            visibleItems[0].click()
        }
    }
    
    showItems(){
        // this.itemTarget.forEach(item => item.hidden = false)
        this.itemTargets.forEach(item => item.hidden = false)
    }
    
    toggleClearButton(event) {
        this.clearButtonTarget.hidden = !event.target.value;
        
    }
    
    clearSearch() {
        this.inputTarget.value = ""
        this.clearButtonTarget.hidden = true;
        this.showItems()
    }
}

export default SearchController;