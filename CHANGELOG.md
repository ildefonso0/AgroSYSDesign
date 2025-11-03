# AgroSYS - Changelog

## v2.0.0 - Interface Profissional com Mapa Interativo

### Novas Funcionalidades

#### Layout de 3 Colunas
- **Barra lateral esquerda (80px)**: Navegação vertical com ícones do AgroSYS
  - Botão "Selecionar Local" (abre diálogo de pesquisa)
  - Ícones de Previsão, Configurações e Informações
  - Design minimalista com fundo verde-floresta (#2E7D32)

- **Painel central (2/3)**: Mapa interativo de Angola
  - Integração com Leaflet.js e OpenStreetMap
  - 20 municípios/cidades mapeados com marcadores verdes
  - Popups informativos em cada ponto
  - Animações suaves ao selecionar localizações
  - Zoom automático ao clicar num município

- **Painel direito (1/3)**: Mockup de telemóvel animado
  - Simulação realista de ecrã de smartphone
  - Atualizações automáticas conforme a seleção no mapa
  - Exibe temperatura, condições e culturas recomendadas
  - Efeito de chat/SMS para agricultores

#### Sistema de Dados Geográficos
- **20 cidades principais de Angola**:
  - Luanda, Huambo, Benguela, Lobito, Lubango
  - Cabinda, Malanje, Namibe, Uíge, Soyo
  - Menongue, Saurimo, Kuito, M'banza-Kongo, Dundo
  - Ondjiva, Sumbe, Caxito, N'dalatando, Camacupa
- Coordenadas precisas (latitude/longitude) para cada localização
- Integração com Open-Meteo API para dados reais

#### Tela de Boas-Vindas
- Apresentação inicial elegante com animações Framer Motion
- Três cards informativos:
  - Dados em Tempo Real
  - Análise com IA
  - Cobertura de 20 Cidades
- Desaparece automaticamente ao clicar no mapa

#### Modal de Detalhes Meteorológicos
- Aparece ao clicar numa cidade
- Exibe todos os dados climáticos numa interface limpa
- Grid de 4 métricas principais (Temperatura, Humidade, Vento, Chuva)
- Previsão de 7 dias em formato horizontal
- Recomendações de culturas com IA integrada
- Animações suaves de entrada/saída

#### Melhorias no Design
- **Header redesenhado**: Fixo no topo, adaptado ao layout de 3 colunas
- **Footer melhorado**:
  - Ícones de redes sociais (Facebook, Twitter, Instagram, LinkedIn)
  - Botão "Saber mais sobre o projeto"
  - Layout responsivo

### Tecnologias Adicionadas
- `leaflet` - Biblioteca de mapas interativos
- `react-leaflet` - Integração React para Leaflet
- `nanoid` - Gerador de IDs únicos
- Animações avançadas com `framer-motion` (já existente)

### Melhorias de UX/UI
- Transições suaves entre estados
- Indicadores de loading elegantes
- Popups informativos no mapa
- Responsividade completa
- Modo escuro/claro totalmente funcional
- Animações de micro-interações

### Estrutura de Componentes
```
/components
  ├── Sidebar.tsx                 - Navegação lateral vertical
  ├── InteractiveMap.tsx          - Mapa Leaflet com marcadores
  ├── AnimatedMobilePreview.tsx   - Mockup de telemóvel animado
  ├── WeatherDetailCard.tsx       - Modal com detalhes completos
  ├── WelcomeScreen.tsx           - Tela inicial de boas-vindas
  ├── Header.tsx                  - Cabeçalho redesenhado
  └── Footer.tsx                  - Rodapé com redes sociais

/data
  └── angolaCities.ts             - Base de dados de 20 cidades
```

### Paleta de Cores (Mantida)
- Verde-floresta: `#2E7D32` (primária)
- Verde-claro: `#81C784` (secundária)
- Amarelo-colheita: `#F9A825` (destaque)
- Cinza-esverdeado: `#F5F7F4` (fundo claro)
- Verde-musgo-escuro: `#1B5E20` (modo escuro)

### Como Usar
1. Abra a aplicação
2. Clique em qualquer marcador verde no mapa de Angola
3. Veja os detalhes meteorológicos e recomendações agrícolas
4. O mockup do telemóvel atualiza automaticamente
5. Use o botão "Selecionar Local" na barra lateral para pesquisa manual

### Próximos Passos (Futuro)
- Integração real com SMS para agricultores
- Sistema de alertas meteorológicos
- Histórico de dados climáticos
- Exportação de relatórios
- Área de utilizador com autenticação
