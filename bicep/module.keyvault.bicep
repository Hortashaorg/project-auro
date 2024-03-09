param env string
param location string

var tenantId = subscription().tenantId

resource keyvault 'Microsoft.KeyVault/vaults@2023-02-01' = {
  name: 'kv-projectauro-${env}'
  location: location
  tags: {
    project: 'service-platform'
    environment: env
    purpose: 'security'
  }
  properties: {
    enabledForDeployment: false
    enabledForDiskEncryption: false
    enabledForTemplateDeployment: false
    enableRbacAuthorization: false
		enableSoftDelete: true
    tenantId: tenantId
    sku: {
      name: 'standard'
      family: 'A'
    }
    networkAcls: {
      defaultAction: 'Deny'
      bypass: 'AzureServices'
      ipRules: []
    }
    accessPolicies: [
      {
        tenantId: tenantId
        objectId: '3c0c790e-90ae-4238-a5e7-375addf4225e' // Read-Keyvault AD group
        permissions: {
          certificates: [
            'Get'
            'List'
          ]
          keys: [
            'Get'
            'List'
          ]
          secrets: [
            'Get'
            'List'
          ]
        }
      }
      {
        tenantId: tenantId
        objectId: '81e551da-14be-43c3-90db-3e30186cc81c' // Martin
        permissions: {
          certificates: [
            'Get'
            'List'
            'Update'
            'Create'
            'Import'
            'Delete'
            'Recover'
            'Backup'
            'Restore'
            'ManageContacts'
            'ManageIssuers'
            'GetIssuers'
            'ListIssuers'
            'SetIssuers'
            'DeleteIssuers'
          ]
          keys: [
            'Get'
            'List'
            'Update'
            'Create'
            'Import'
            'Delete'
            'Recover'
            'Backup'
            'Restore'
            'GetRotationPolicy'
            'SetRotationPolicy'
            'Rotate'
          ]
          secrets: [
            'Get'
            'List'
            'Set'
            'Delete'
            'Recover'
            'Backup'
            'Restore'
          ]
        }
      }
    ]
  }
}
