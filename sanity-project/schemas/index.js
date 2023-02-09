export const schemaTypes = [
    {
        title: 'Coins',
        name: 'coins',
        type: 'document',
        fields: [
            {
                title: 'Name',
                name: 'name',
                 type: 'string',
            },
            {
                title: 'Symbol',
                name: 'symbol',
                 type: 'string',
            },
            {
                title: 'Contract Address',
                name: 'contractAddress',
                 type: 'string',
            },
            {
                title: 'India Price',
                name: 'indPrice',
                 type: 'string',
            },
            {
                title: 'Logo',
                name: 'logo',
                 type: 'image',
            },
        ]
    }
]
