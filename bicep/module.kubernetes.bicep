param location string
param env string
param dnsPrefix string = 'auroaks'
param vmSize string = 'Standard_D2s_v3'
param nodeCount int = 1

resource aksCluster 'Microsoft.ContainerService/managedClusters@2023-11-01' = {
  name: 'aks-projectauro-${env}'
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    dnsPrefix: dnsPrefix
    agentPoolProfiles: [
      {
        name: 'nodepool1'
        count: nodeCount
        vmSize: vmSize
        osType: 'Linux'
        mode: 'System'
      }
    ]
  }
}
