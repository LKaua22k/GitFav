import { GitHubUser } from "./githubUser.js"

export class Favorites {
    constructor (root){
        this.root =  document.querySelector(root)

    }
}


export class FavoritesViews extends Favorites {
    constructor(root){
        super(root)

        this.body = this.root.querySelector('table tbody')

        this.update()
    }

    update(){
        this.removeAllTr()
    }


    removeAllTr(){
        this.body.querySelectorAll('tr').forEach( (tr) => {
            tr.remove()
        });
    }
}