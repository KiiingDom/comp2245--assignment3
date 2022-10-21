let grid = ['','','','','','','','','']
const winCombo = 
[
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
]
const choices = ['O','X']
let player = 0
let gameOver = false
function gameWinner()
{
    let ans = false
    winCombo.forEach(path => 
	{
        if
	   (
            choices[player] === grid[path[0]]
            && grid[path[0]] === grid[path[1]] 
            && grid[path[1]] === grid[path[2]]
            ) ans = true
       })
    return ans
}

document.addEventListener('DOMContentLoaded',(evt)=>
{
    const status = document.getElementById('status')
    const tiles = document.getElementById('board').children
    document.getElementsByClassName('btn')[0].onclick = (evt)=>
	{
        gameOver = false
        status.classList.remove("you-won")
        status.textContent = 'Place cursor over any box and press to play X or O.'
        for( i = 0 ; i <tiles.length ; i++) tiles[i].textContent = '';
        grid = ['','','','','','','','','']
    }
    for(i = 0 ; i < tiles.length ; i++)
	{
        const tile = tiles[i]
        tile.classList.add('square')
        tile.id = `${i}`
        tile.addEventListener('click',(evt)=>
		{
            const index = evt.currentTarget.id
            if( grid[index] === ''  && !gameOver) 
		{
                const tile = document.getElementById(index)
                grid[index] = choices[player]
                tile.classList.add(choices[player])
                tile.textContent = choices[player]
                gameOver = gameWinner()
                if( gameOver ) 
			{
                    status.classList.add('you-won')
                    status.textContent = `'${choices[player]}' has won!`
                	}
                player = ++player % 2
            	}
       		})
        tile.addEventListener('mouseover',(evt)=>{
            document.getElementById(evt.currentTarget.id).classList.add('hover')
        })
        tile.addEventListener('mouseleave',(evt)=>{
            document.getElementById(evt.currentTarget.id).classList.remove('hover')
        })
    }
})