targetScope = 'subscription'

@description('Specifies the location for resources.')
param location string = 'Norway East'


module projectauro 'projectauro.bicep' = {
	name: 'projectauro-dev'
	params: {
		location: location
		resourceGroupName: 'rg-projectauro-dev'
		env: 'dev'
	}
}
