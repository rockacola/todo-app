export const DrinksModule = {
  name: 'myDrinks',
  builder: (privateClient: any) => {
    privateClient.declareType('drink', {
      type: 'object',
      properties: {
        name: { type: 'string' },
      },
      required: ['name']
    });

    return {
      exports: {

        init: () => {
          privateClient.cache('');
        },

        on: privateClient.on,

        addDrink: (name: string) => {
          const id = name.toLowerCase().replace(/\s|\//g, '-'); // TODO: hash it reliably
          return privateClient.storeObject('drink', id, {
            name,
          });
        },

        removeDrink: privateClient.remove.bind(privateClient),

        listDrinks: () => {
          return privateClient.getAll('');
        }
      }
    }
  }
};
