document.addEventListener('DOMContentLoaded', () => {
    const mediaElements = document.querySelectorAll('.media-element');
    const resultsDiv = document.querySelector('.results');
    
    mediaElements.forEach(element => {
        element.addEventListener('click', async () => {
            const type = element.getAttribute('data-type'); // Get the type (e.g., fire, water, etc.)
            const typeData = await fetchTypeData(type);
            displayTypeRelations(type, typeData);
        });
    });

    // Fetch type data from the PokeAPI
    async function fetchTypeData(type) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data.damage_relations;
        } catch (error) {
            console.error('Error fetching type data:', error);
            return null;
        }
    }

    // Display the type relations in the .results div
    function displayTypeRelations(type, damageRelations) {
        if (!damageRelations) {
            resultsDiv.innerHTML = '<p>Error fetching type relations.</p>';
            return;
        }

        const doubleDamageTo = damageRelations.double_damage_to.map(t => t.name).join(', ') || 'None';
        const doubleDamageFrom = damageRelations.double_damage_from.map(t => t.name).join(', ') || 'None';
        const halfDamageTo = damageRelations.half_damage_to.map(t => t.name).join(', ') || 'None';
        const halfDamageFrom = damageRelations.half_damage_from.map(t => t.name).join(', ') || 'None';
        const noDamageTo = damageRelations.no_damage_to.map(t => t.name).join(', ') || 'None';
        const noDamageFrom = damageRelations.no_damage_from.map(t => t.name).join(', ') || 'None';

        resultsDiv.innerHTML = `
            <h2>Type Relations for ${type}</h2>
            <p><strong>Double Damage To:</strong> ${doubleDamageTo}</p>
            <p><strong>Double Damage From:</strong> ${doubleDamageFrom}</p>
            <p><strong>Half Damage To:</strong> ${halfDamageTo}</p>
            <p><strong>Half Damage From:</strong> ${halfDamageFrom}</p>
            <p><strong>No Damage To:</strong> ${noDamageTo}</p>
            <p><strong>No Damage From:</strong> ${noDamageFrom}</p>
        `;
    }
});