export interface item {
    text: string
    obtained: boolean
}

export default class BingoArray {
    public rows: Array<Array<item>>
    constructor(items: Array<string | null> | Array<Array<item>>,) {
        this.rows = []

        if(typeof(items[0])=== 'string'){
            this.shuffleAndCreate(items as Array<string | null>)
        }
        if(Array.isArray(items[0])){
            this.rows = items as Array<Array<item>>
        }

    }
    consoleLog() {
        console.table(this.rows)
    }

    shuffleAndCreate(items: Array<string | null>){

        let itemsCopy = [...items]

        let gridSize = Math.sqrt(itemsCopy.length)

        while (!Number.isInteger(gridSize)) {
            itemsCopy.push(null)
            gridSize = Math.sqrt(itemsCopy.length)
        }

        itemsCopy = this.shuffle(itemsCopy)

        let count = 0;

        for (let indexA = 0; indexA < gridSize; indexA++) {
            let row: Array<item> = new Array()
            for (let indexB = 0; indexB < gridSize; indexB++) {
                row.push({
                    text: itemsCopy[count] || '',
                    obtained: false
                })
                count++

            }
            this.rows.push(row)

        }

    }

    public checkForBingo() {
        if (this.checkRowsForBingo()) return true
        if (this.checkColumnsForBingo()) return true
        if (this.checkDiagonalForBingo()) return true
        return false
    }

    private checkDiagonalForBingo() {
        // Check top-left to bottom-right diagonal
        const diagonal1 = this.rows.map((row, i) => row[i]);
        if (diagonal1.every(x => x.obtained)) {
            return true;
        }
        // Check top-right to bottom-left diagonal
        const diagonal2 = this.rows.map((row, i) => row[this.rows.length - i - 1]);
        if (diagonal2.every(x => x.obtained)) {
            return true;
        }
        return false;
    }

    private checkColumnsForBingo() {
        let countArray = Array.apply(null, Array(this.rows.length)).map(() => 0)
        for (let indexRow = 0; indexRow < this.rows.length; indexRow++) {

            for (let indexColumn = 0; indexColumn < this.rows.length; indexColumn++) {
                if (this.rows[indexRow][indexColumn].obtained) countArray[indexColumn]++
            }

        }

        for (let index = 0; index < countArray.length; index++) {
            if (countArray[index] === this.rows.length)
                return true
        }
    }

    private checkRowsForBingo() {
        for (let rowIndex = 0; rowIndex < this.rows.length; rowIndex++) {
            let row = this.rows[rowIndex];
            let obtainedCountRow = 0
            for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
                if (row[columnIndex].obtained) obtainedCountRow++;

            }
            if (obtainedCountRow === row.length) return true

        }
        return false
    }

    shuffle(array: Array<string | null>) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }
}