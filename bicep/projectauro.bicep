targetScope = 'subscription'

@description('Name of the (top-level) environment. Will be added as suffix to resource names.')
@allowed([ 'dev', 'prod', 'test' ])
param env string

@description('Specifies the location for resources.')
@allowed([ 'Norway East' ])
param location string

@description('Specifies the name of the resource group.')
@minLength(1)
@maxLength(90)
param resourceGroupName string

resource resourceGroup 'Microsoft.Resources/resourceGroups@2020-06-01' = {
	name: resourceGroupName
	location: location
}


module keyvault 'module.keyvault.bicep' = {
	name: 'keyvault-projectauro-${env}'
	scope: resourceGroup
	params: {
		env: env
		location: location
	}
}

module storageaccount 'module.storage.bicep' = {
	name: 'stprojectauro-${env}'
	scope: resourceGroup
	params: {
		env: env
		location: location
	}
}
