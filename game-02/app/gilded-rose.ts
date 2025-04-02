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

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (const item of this.items) {
            if (item.name.startsWith('Sulfuras')) {
                continue;
            }
        
            let sellIn = item.sellIn > 0 ? item.sellIn - 1 : 0;
            let quality = item.quality > 0 ? item.quality - 1 : 0;

            if (item.name.startsWith('Aged Brie')) {
                quality = item.quality + 1;
            } 
            
            if (item.name.startsWith('Backstage passes')) {
                let increment = 1;
                if (sellIn < 5) {
                    increment = 3;
                } else if (sellIn < 10) {
                    increment = 2;
                }

                quality = sellIn > 0 ? item.quality + increment : 0;
            }  
            
            if (item.name.startsWith('Conjured')) {
                quality = item.quality - 2;
            }
            
            item.sellIn = sellIn;
            item.quality = quality > 50 ? 50 : (quality < 0 ? 0 : quality);
        }

        return this.items;
    }
}
