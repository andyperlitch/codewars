const INVALID_CHARACTERS = /[^a-z\d\.\s]/gi

function balance(book) {
  // Parse input
  const [balanceRaw, ...entriesRaw] = book.split('\n')
  const balance = Number(balanceRaw.replace(INVALID_CHARACTERS, ''))

  // Set up accumulators
  let remainingBalance = balance
  let totalExpense = 0

  // Parse entries
  const entries = entriesRaw
    // Filter empty rows (could do more validation here)
    .filter(rawEntry => rawEntry.trim().length > 0)
    // Parse each entry and update accumulators, and return string to be used in report
    .map(rawEntry => {
      // Clean entry
      const cleanedEntry = rawEntry
        // Remove unexpected characters
        .replace(INVALID_CHARACTERS, '')
        // de-dupe spaces
        .replace(/\s+/, ' ')
        // remove outside spaces
        .trim()

      // Parse entry
      const [checkNumber, category, checkAmountRaw] = cleanedEntry
        .trim()
        .split(' ')
      const checkAmount = Number(checkAmountRaw)

      // Update accumulators
      remainingBalance -= checkAmount
      totalExpense += checkAmount

      // NOTE: if more requirements added, we can return objects here and
      // create the report string later

      // Return the report string
      return `${checkNumber} ${category} ${checkAmount.toFixed(
        2,
      )} Balance ${remainingBalance.toFixed(2)}`
    })

  const entriesString = entries.join('\r\n')

  // Calculate the average expense
  const avgExpense = totalExpense / entries.length

  // Generate report
  return [
    `Original Balance: ${balance.toFixed(2)}`,
    entriesString,
    `Total expense  ${totalExpense.toFixed(2)}`,
    `Average expense  ${avgExpense.toFixed(2)}`,
  ].join('\r\n')
}
