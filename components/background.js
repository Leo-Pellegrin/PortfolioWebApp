        
        
        const searchForPerfectBackground = () => {
            const screen = document.createElement('div')    
            document.body.appendChild(screen)

            const searchInput = document.createElement('input')
            searchInput.setAttribute('type', 'text')
            searchInput.setAttribute('placeholder', 'Search for the perfect background...')
            screen.appendChild(searchInput)

            const searchButton = document.createElement('button')
            searchButton.textContent = 'Search'
            screen.appendChild(searchButton)

            const results = document.createElement('div')
            results.textContent = 'Sorry, the perfect background doesn\'t exist!'
            screen.appendChild(results)
        }

        searchForPerfectBackground()



















