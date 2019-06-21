function balance(book) {
  // Parse input
  const [balanceRaw, ...entriesRaw] = book.split('\n')
  const balance = Number(balanceRaw)

  // Set up accumulators
  let remainingBalance = balance
  let totalExpense = 0

  // Parse entries
  const entries = entriesRaw
    // Filter empty rows (could do more validation here)
    .filter((rawEntry) => rawEntry.trim().length > 0)
    // Parse each entry and update accumulators, and return string to be used in report
    .map((rawEntry) => {
      // Clean entry
      const cleanedEntry = rawEntry
        // Remove unexpected characters
        .replace(/[^a-z\d\.\s]/ig, '')
        // de-dupe spaces
        .replace(/\s+/, ' ')
        // remove outside spaces
        .trim()
      const [checkNumber, category, checkAmountRaw] = cleanedEntry.trim().split(' ')
      const checkAmount = Number(checkAmountRaw)

      // Update accumulators
      remainingBalance -= checkAmount
      totalExpense += checkAmount

      // NOTE: if more requirements added, we can return objects here and
      // create the report string later

      // Return the report string
      return `${checkNumber} ${category} ${checkAmount} Balance ${remainingBalance.toFixed(2)}`
    })
    .join('\r\n')

  // Calculate the average expense
  const avgExpense = totalExpense / entries.length
  
  console.log('totalExpense', totalExpense)
  
  // Generate report
  return [
    `Original Balance: ${balance.toFixed(2)}`,
    entries,
    `Total expense  ${totalExpense.toFixed(2)}`,
    `Average expense ${avgExpense.toFixed(2)}`
  ].join('\r\n')
}
