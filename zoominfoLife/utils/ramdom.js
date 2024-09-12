const userAgents = [
  // Google Chrome trên macOS
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 13.0; rv:114.0) Gecko/20100101 Firefox/114.0',
  // Safari trên macOS
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0_0) AppleWebKit/537.36 (KHTML, like Gecko) Version/16.6 Safari/537.36',
  // Microsoft Edge trên macOS
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 13.0; rv:114.0) Gecko/20100101 Firefox/114.0',
  // Opera trên macOS
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 13.0; rv:90.0) Gecko/20100101 Firefox/90.0 OPR/90.0.0.0',
  // Brave trên macOS
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 13.0; rv:2.0.0) Gecko/20100101 Brave/2.0.0 Safari/537.36',
  // Firefox trên macOS
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 13.0; rv:112.0) Gecko/20100101 Firefox/112.0',
  // Google Chrome trên macOS với phiên bản cũ
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 12_3_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Safari/537.36',
];

const proxies = [
  {
    login: '8c5906b99fbd1c0bcd0f916d545c565a9d7a885de471b804db103a259074aa1dce2ee3ed66c00422dfb8473d4fb227f938efcb0cb4d71dac37c2409a5fd9f6776bd5fd8313327dc1daf00357712eb2ea',
    password: '2lh6kuxj14tv',
    host: 'proxy.toolip.io',
    port: '31114',
    ip: null,
    country: 'us',
    socks5: false,
  },
  {
    login: '8c5906b99fbd1c0bcd0f916d545c565a9d7a885de471b804db103a259074aa1dce2ee3ed66c00422dfb8473d4fb227f938efcb0cb4d71dac37c2409a5fd9f6775162aca4a8fb01fbf6b1fe8bd715ddd6',
    password: '2lh6kuxj14tv',
    host: 'proxy.toolip.io',
    port: '31111',
    ip: null,
    country: 'us',
    socks5: false,
  },
  {
    login: '8c5906b99fbd1c0bcd0f916d545c565a9d7a885de471b804db103a259074aa1dce2ee3ed66c00422dfb8473d4fb227f938efcb0cb4d71dac37c2409a5fd9f6778f30201b9f474ba8a93fc96b29ef92c3',
    password: '2lh6kuxj14tv',
    host: 'proxy.toolip.io',
    port: '31112',
    ip: null,
    country: 'us',
    socks5: false,
  },
  {
    login: '8c5906b99fbd1c0bcd0f916d545c565a9d7a885de471b804db103a259074aa1dce2ee3ed66c00422dfb8473d4fb227f93a06ea42e06f4afaadc4d57988cc1e03f1a0900950ed607439caad6828312d68',
    password: '2lh6kuxj14tv',
    host: 'proxy.toolip.io',
    port: '31113',
    ip: null,
    country: 'de',
    socks5: false,
  },
  {
    login: '8c5906b99fbd1c0bcd0f916d545c565a9d7a885de471b804db103a259074aa1dce2ee3ed66c00422dfb8473d4fb227f95f92322f49783f9ffc3ddd9065bd8582290b2a9bcffc0ac9e3e275b9d817c863',
    password: '2lh6kuxj14tv',
    host: 'proxy.toolip.io',
    port: '31114',
    ip: null,
    country: 'fr',
    socks5: false,
  },
];

module.exports = { userAgents, proxies };
