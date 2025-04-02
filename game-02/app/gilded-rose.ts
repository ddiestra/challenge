export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

abstract class ItemUpdater {
    abstract updateQuality(item: Item): void;
    
    protected decreaseSellIn(item: Item): void {
        item.sellIn = Math.max(0, item.sellIn - 1);
    }
    
    protected normalizeQuality(item: Item): void {
        item.quality = Math.min(50, Math.max(0, item.quality));
    }
}

class StandardItemUpdater extends ItemUpdater {
    updateQuality(item: Item): void {
        this.decreaseSellIn(item);
        item.quality -= 1;
        this.normalizeQuality(item);
    }
}

class SulfurasUpdater extends ItemUpdater {
    updateQuality(item: Item): void {}
}

class AgedBrieUpdater extends ItemUpdater {
    updateQuality(item: Item): void {
        this.decreaseSellIn(item);
        item.quality += 1;
        this.normalizeQuality(item);
    }
}

class BackstagePassUpdater extends ItemUpdater {
    updateQuality(item: Item): void {
        this.decreaseSellIn(item);
        
        if (item.sellIn === 0) {
            item.quality = 0;
            return;
        }

        let increment = 1;
        if (item.sellIn < 5) {
            increment = 3;
        } else if (item.sellIn < 10) {
            increment = 2;
        }
        item.quality += increment;
        this.normalizeQuality(item);
    }
}

class ConjuredItemUpdater extends ItemUpdater {
    updateQuality(item: Item): void {
        this.decreaseSellIn(item);
        item.quality -= 2;
        this.normalizeQuality(item);
    }
}

class ItemUpdaterFactory {
    static createUpdater(name: string): ItemUpdater {
        if (name.startsWith('Aged Brie')) {
            return new AgedBrieUpdater();
        }
        
        if (name.startsWith('Backstage passes')) {
            return new BackstagePassUpdater();
        }
        
        if (name.startsWith('Sulfuras')) {
            return new SulfurasUpdater();
        }
        
        if (name.startsWith('Conjured')) {
            return new ConjuredItemUpdater();
        }
        
        return new StandardItemUpdater();
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        this.items.forEach(item => {
            const updater = ItemUpdaterFactory.createUpdater(item.name);
            updater.updateQuality(item);
        });

        return this.items;
    }
}
