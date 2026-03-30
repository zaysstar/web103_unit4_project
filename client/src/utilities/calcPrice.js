export const calculateTotalPrice = (caseColor, switchType, keycapTheme) => {
    let total = 0;
    
    // Feature 1: Case Prices
    if (caseColor === 'Obsidian Black') total += 50;
    if (caseColor === 'Glacier White') total += 50;
    if (caseColor === 'Neon Cyberpunk Acrylic') total += 80;
    
    // Feature 2: Switch Prices
    if (switchType === 'Linear Reds') total += 30;
    if (switchType === 'Tactile Browns') total += 30;
    if (switchType === 'Clicky Blues') total += 35;
    
    // Feature 3: Keycap Prices
    if (keycapTheme === 'Retro 90s') total += 40;
    if (keycapTheme === 'Matcha Minimalist') total += 45;
    if (keycapTheme === 'RGB Pudding') total += 50;
    
    return total;
}