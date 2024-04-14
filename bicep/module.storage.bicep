param location string
param env string

resource stprojectauro 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  name: 'stprojectauro${env}'
  location: location
  properties: {
    allowBlobPublicAccess: true
  }
}
