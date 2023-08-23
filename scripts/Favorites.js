import { GitHubUser } from "./githubUser.js"

export class Favorites {
    constructor (root){
        this.root =  document.querySelector(root)

        this.load()
        this.onadd()
    }

    load(){
        this.entrises = JSON.parse(localStorage.getItem('@github-favorites')) || []
    }

    save(){
        localStorage.setItem('@github-favorites',JSON.stringify(this.entrises))
    }

        async add(username){
            const gitUser = await GitHubUser.search(username)


            this.entrises = [gitUser , ...this.entrises]
            this.update()
            this.save()
        }
}



export class FavoritesViews extends Favorites {
    constructor(root){
        super(root)

        this.tbody = this.root.querySelector('table tbody')

        this.update()
    }

    update(){
        this.removeAllTr()
        
        this.entrises.forEach((user) => {
            const row = this.CreateRow()

            row.querySelector('.users img').src = `https://github.com/${user.login}.png`
            row.querySelector('.users a span').textContent = user.name
            row.querySelector('.users a p').textContent = user.login
            row.querySelector('.users a').href = `https://github.com/${user.login}`
            row.querySelector('.Repositories').textContent = user.public_repos
            row.querySelector('.Followers').textContent = user.followers
            row.querySelector('.remove').addEventListener('click', () => {
                const isOk = confirm('Deseja excluir?')

                if(isOk){
                    this.delete(user)
                }
            })


            this.tbody.append(row)
        })
    }


    CreateRow(){
        const tr = document.createElement('tr')

        tr.innerHTML = `
                            <td class="users">
                        <img src="https://github.com/diego3g.png" alt="Imagen do Kauã" srcset="">
                        
                        <a href="https://github.com/diego3g">
                            <span>Diego</span>
                            <p>/Diego3g</p>
                        </a>
                    </td>
                    
                    <td class="Repositories">
                        32
                    </td>

                    <td class="Followers">
                        1
                    </td>

                    <td>
                        <button class="remove">Remover</button>
                    </td>
                </tr>
        `

        return tr
    }

    onadd(){
        const addBtutton = this.root.querySelector('.search button')
        addBtutton.addEventListener('click', () => {
            const { value } = this.root.querySelector('.search input')

            console.log(value)

            this.add(value)
        })
    }


    removeAllTr(){
        this.tbody.querySelectorAll('tr').forEach( (tr) => {
            tr.remove()
        });
    }
}