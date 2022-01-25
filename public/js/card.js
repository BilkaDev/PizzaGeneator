const deleteX = document.querySelectorAll('.deleted-x')

deleteX.forEach(item => {

    item.addEventListener('click', (e)=>{

        (async () => {
            const response = await fetch('/getCookies');
            const cookies = (await response.json())['pizza-addons'].filter(cookie => cookie !== e.target.dataset.addon);

            await fetch('/',
                {
                    method: "POST",
                    body: JSON.stringify(cookies),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            location.reload();
        })();



    })
})
