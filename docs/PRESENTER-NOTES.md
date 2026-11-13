# Beyond the Prompt — presenter script

Share the audience browser window only. Keep presenter notes on a private display. All personal project details and impacts must be confirmed before delivery.

## 01 · Beyond the prompt.

Chapter 1: The hook · 00–04 minutes · Scene allocation: 0.5 minutes

Welcome everyone. Today is about looking at work differently. You already understand transactions, evidence and controls. Keep that advantage in mind. Pause, then ask for a show of hands on the next screen.

**Takeaway:** Your domain knowledge is your starting point.

**Transition:** Let us start with two different questions.

**Next:** How many of you have used AI?

## 02 · How many of you have used AI?

Chapter 1: The hook · 00–04 minutes · Scene allocation: 3.5 minutes

Ask: how many have used AI? Pause and acknowledge the room. Then select Built something and ask the second question. Building can mean a useful spreadsheet, macro or small app; it does not have to mean a startup. Reveal the three lines one at a time.

**Takeaway:** Using, building and knowing where to apply are distinct skills.

**Transition:** That difference began to matter during Articleship.

**Next:** An accounting background. A builder’s curiosity.

## 03 · An accounting background. A builder’s curiosity.

Chapter 2: The Articleship story · 04–09 minutes · Scene allocation: 2 minutes

I came from an accounting background and was learning audit during Articleship. I did not start with formal software engineering training. Walk through the timeline. Ask the room which repeated step they have already accepted as normal. Confirm any personal detail before delivery.

**Takeaway:** Observe the process before choosing the tool.

**Transition:** Here is where that curiosity led.

**Next:** Small tools. Professional problems.

## 04 · Small tools. Professional problems.

Chapter 2: The Articleship story · 04–09 minutes · Scene allocation: 3 minutes

Choose one or two authorised projects. Explain the actual problem, approach, build and verified impact. Add only screenshots cleared for presentation. The editable fields deliberately start without claims. Do not infer client names or time savings.

**Takeaway:** A useful tool starts with a specific operational problem.

**Transition:** Your next useful solution may already be sitting in a workbook.

**Next:** The next useful solution might be hiding in your Excel sheet.

## 05 · The next useful solution might be hiding in your Excel sheet.

Chapter 3: The opportunity map · 09–16 minutes · Scene allocation: 3 minutes

Select the four categories. For each, ask someone for an example from their work. Explain that duplicate detection is a candidate check, completeness needs a reference population, and reconciliation requires agreed totals. No confidential examples from the room.

**Takeaway:** Repeated friction is a signal worth investigating.

**Transition:** Let us test one idea against five questions.

**Next:** Is this an opportunity?

## 06 · Is this an opportunity?

Chapter 3: The opportunity map · 09–16 minutes · Scene allocation: 2 minutes

Ask the audience to choose a repeated task. Answer the questions together. A high score means the idea is easier to define and test; it is not permission to automate. A low score suggests more discovery. Independent verification is particularly important.

**Takeaway:** An opportunity score starts discovery; it does not establish suitability.

**Transition:** A good idea still needs the right tool.

**Next:** Sometimes a formula is smarter.

## 07 · Sometimes a formula is smarter.

Chapter 3: The opportunity map · 09–16 minutes · Scene allocation: 2 minutes

Show a formula for a sum, a rule for a date and AI for ambiguous text. Ask: would we hire an interpreter to add a column? Explain that the simplest reliable method is often easiest to review and maintain.

**Takeaway:** Choose the simplest method that meets the need.

**Transition:** Now let us describe the work before we describe the technology.

**Next:** Stop thinking in tasks. Start thinking in systems.

## 08 · Stop thinking in tasks. Start thinking in systems.

Chapter 4: Think in workflows · 16–25 minutes · Scene allocation: 1 minutes

Pause after the first line. Compare “consolidate the files” with “receive, identify, standardise, validate and reconcile”. Ask what could go wrong between receiving and reporting. Reveal the transformation line.

**Takeaway:** A workflow makes dependencies and controls visible.

**Transition:** Seven blocks give us a language for that system.

**Next:** Seven blocks. One dependable workflow.

## 09 · Seven blocks. One dependable workflow.

Chapter 4: Think in workflows · 16–25 minutes · Scene allocation: 3 minutes

Walk through the seven blocks. Select Control: a report that looks correct is not a control. Ask what independent total we could reconcile to. Select Feedback and explain that recurring exceptions should improve the process rather than just be cleared each month.

**Takeaway:** Trigger → Input → Processing → Decision → Output → Control → Feedback.

**Transition:** Let us apply those blocks to 15 differently formatted files.

**Next:** 15 workbooks. One monthly report.

## 10 · 15 workbooks. One monthly report.

Chapter 4: Think in workflows · 16–25 minutes · Scene allocation: 4 minutes

Start in Task view and ask what is missing. Switch to Workflow and reveal each step. Distinguish a rejected file from a rejected row. Keep a source register, control totals and an exception log. Missing files should never quietly become zero balances.

**Takeaway:** Map exceptions and reconciliation alongside the happy path.

**Transition:** Before asking AI to help, check whether we can explain the process ourselves.

**Next:** Never ask AI to solve a problem you haven’t understood yourself.

## 11 · Never ask AI to solve a problem you haven’t understood yourself.

Chapter 4: Think in workflows · 16–25 minutes · Scene allocation: 1 minutes

Ask one student to explain the consolidation in three sentences. Pause. If they cannot define what correct means, go back to the map. The quality of a solution begins before any code is generated.

**Takeaway:** Understanding is the first control.

**Transition:** What are we actually building underneath the interface?

**Next:** You should know what you’re building.

## 12 · You should know what you’re building.

Chapter 5: Understand the technology · 25–31 minutes · Scene allocation: 2 minutes

Click through the architecture. The interface receives input, logic applies the process, rules or AI support decisions, and output is reviewed. These are responsibilities, not necessarily separate servers or products. In today’s demo everything runs locally.

**Takeaway:** An interface is only one part of a solution.

**Transition:** Which of these decisions belongs to a rule, AI or a person?

**Next:** Rules. AI. Human judgment.

## 13 · Rules. AI. Human judgment.

Chapter 5: Understand the technology · 25–31 minutes · Scene allocation: 2 minutes

Select each responsibility. Fixed calculations and mandatory fields are deterministic. Ambiguous descriptions may benefit from AI, but confidence is not evidence. Audit significance, sufficiency of evidence and final conclusions remain professional decisions.

**Takeaway:** Assign each step to the right kind of decision maker.

**Transition:** Let us demystify the language assistant itself.

**Next:** A language assistant, one token at a time.

## 14 · A language assistant, one token at a time.

Chapter 5: Understand the technology · 25–31 minutes · Scene allocation: 2 minutes

An LLM receives tokens and context, uses learned parameters and generates a response one token at a time. Tokens are pieces of text, not always words. Learned parameters are patterns from training, not a verified reference database. Click Generate to reveal a plausible response. It can be fluent and still wrong. Ask: which claims would you verify?

**Takeaway:** Probabilistic output needs evidence and validation.

**Transition:** We now have enough vocabulary to build a small working solution.

**Next:** Enough theory. Let’s build something.

## 15 · Enough theory. Let’s build something.

Chapter 6: The live build · 31–44 minutes · Scene allocation: 1 minutes

Introduce the synthetic audit-support prototype. The objective is to identify candidates for investigation. We have no model connection. Rules are visible and repeatable, and description suggestions are explicitly keyword based.

**Takeaway:** A small working prototype makes the workflow tangible.

**Transition:** First agree the problem and requirements.

**Next:** From a problem to testable requirements.

## 16 · From a problem to testable requirements.

Chapter 6: The live build · 31–44 minutes · Scene allocation: 3 minutes

Reveal Problem, Requirements, Logic, Build, Test and Improvement. Before showing the app, ask what a duplicate means. Same invoice number across different vendors is not enough. Define the date window and threshold. Agree expected outcomes before running checks.

**Takeaway:** Make the expected result testable before you build.

**Transition:** Let us run those checks against planted exceptions.

**Next:** Expense Exception Workbench.

## 17 · Expense Exception Workbench.

Chapter 6: The live build · 31–44 minutes · Scene allocation: 6 minutes

Begin with exception-planted data. Run checks. Open a duplicate record and show the reasons. Filter rule flags, then review suggestions. Change the amount threshold and run again; the metrics become pending until rerun. Switch to clean data and confirm no flags at the default settings. Demonstrate search, dates and reset. Keep the disclaimer visible.

**Takeaway:** Flags indicate potential exceptions, not audit findings.

**Transition:** The checks are only convincing if we test what they should catch.

**Next:** Test the edge. Then improve the rule.

## 18 · Test the edge. Then improve the rule.

Chapter 6: The live build · 31–44 minutes · Scene allocation: 2 minutes

Run the self-check. Discuss invoices exactly on the threshold and dates exactly at the period boundaries. Similar invoice numbers may be different; exact duplicates may be valid reversals. Investigate underlying evidence. Missing GSTIN is a missing-field flag, not a conclusion about GST applicability.

**Takeaway:** Test normal, exceptional and boundary cases.

**Transition:** What changed when we moved from manual review to a visible process?

**Next:** From scattered checks to a reviewable register.

## 19 · From scattered checks to a reviewable register.

Chapter 6: The live build · 31–44 minutes · Scene allocation: 1 minutes

Show Before: ad hoc copying and undocumented filters. Show After: explicit settings, repeatable checks and a traceable exception register. This is a design comparison, not a measured savings claim. We still need evidence, reviewer sign-off and retention controls.

**Takeaway:** Repeatability and traceability matter as much as speed.

**Transition:** The prototype works. Now the harder question.

**Next:** It works. Can we trust it?

## 20 · It works. Can we trust it?

Chapter 7: Think like an enterprise · 44–52 minutes · Scene allocation: 1 minutes

Read “It works”, pause, then reveal “Can we trust it?” Ask who owns the tool when the creator is on leave. A tool that works only when its creator operates it is a personal productivity hack. A tool others can reliably use is a business solution.

**Takeaway:** Reliability includes people, permissions and ownership.

**Transition:** Let us add the controls around the processing line.

**Next:** Five dimensions of professional trust.

## 21 · Five dimensions of professional trust.

Chapter 7: Think like an enterprise · 44–52 minutes · Scene allocation: 3 minutes

Click all five dimensions. Ask about approved tools, where data is processed, access rights and deletion. For accuracy, discuss tests and error handling. For accountability, name an owner and reviewer. For scalability, include format changes and documentation. For impact, measure rework as well as minutes.

**Takeaway:** A trustworthy solution is controlled, owned and maintainable.

**Transition:** We should measure the benefit with the same care.

**Next:** Measure the impact. Include the hidden work.

## 22 · Measure the impact. Include the hidden work.

Chapter 7: Think like an enterprise · 44–52 minutes · Scene allocation: 3 minutes

Enter hypothetical values supplied by the room and label them as estimates. Gross saving excludes extra review and maintenance; net saving includes them. A negative result is useful information. Confirm quality and exception coverage rather than optimising speed alone.

**Takeaway:** Measure net benefit, error rate, coverage and adoption.

**Transition:** Even a positive number does not transfer professional responsibility.

**Next:** Automation should strengthen professional judgment.

## 23 · Automation should strengthen professional judgment.

Chapter 7: Think like an enterprise · 44–52 minutes · Scene allocation: 1 minutes

Pause and ask: would you sign off simply because the tool displayed a green tick? Discuss evidence evaluation. Tools can make checks more consistent, but cannot make accountability disappear. Follow the firm’s actual policies and approval process.

**Takeaway:** Automation supports professional judgment.

**Transition:** Now it is your turn to choose one workflow.

**Next:** Find your first workflow.

## 24 · Find your first workflow.

Chapter 8: The audience challenge · 52–56 minutes · Scene allocation: 3 minutes

Give 30 seconds to select a task, then two minutes to complete the five fields. Encourage a small monthly or weekly task with a defined output. Ask how they would independently validate it. Generate and copy the summary. Notes stay in this browser session; they are not sent anywhere.

**Takeaway:** A clearly defined small problem is enough to begin.

**Transition:** Compare your idea with these three questions.

**Next:** Can you explain it to someone else?

## 25 · Can you explain it to someone else?

Chapter 8: The audience challenge · 52–56 minutes · Scene allocation: 1 minutes

Ask pairs to explain the input, decision and control in 20 seconds each. The partner asks one question: what would a wrong result look like? Pause. Invite one non-confidential example. Do not promise every idea should be automated.

**Takeaway:** If someone else cannot follow the map, refine the map.

**Transition:** Here is an optional plan for the next seven days.

**Next:** Seven days. One useful beginning.

## 26 · Seven days. One useful beginning.

Chapter 9: The closing · 56–60 minutes · Scene allocation: 2 minutes

Walk through the days. Observe first, select one small task, map it, prototype with synthetic data, test boundary cases, review with an appropriate supervisor and measure. Obtain required approval before using real data or deploying.

**Takeaway:** Progress from observation to measured impact.

**Transition:** The goal is not to collect tools. It is to make one useful change.

**Next:** One problem. One workflow. One solution. One measurable impact.

## 27 · One problem. One workflow. One solution. One measurable impact.

Chapter 9: The closing · 56–60 minutes · Scene allocation: 1 minutes

Reveal each line deliberately. Invite the audience to remember the task they wrote down. They do not need to become software engineers overnight; they need to observe carefully, define correctness and build within approved boundaries.

**Takeaway:** Task executor → workflow builder → impact creator.

**Transition:** Let me leave you with a different question.

**Next:** Don’t ask what AI can do. Ask what shouldn’t still be done manually.

## 28 · Don’t ask what AI can do. Ask what shouldn’t still be done manually.

Chapter 9: The closing · 56–60 minutes · Scene allocation: 1 minutes

Read the first sentence and pause. Reveal the second. Thank the audience and leave this screen up for closing remarks and Q&A. Invite questions on the workflow, validation and professional responsibility as well as the technology.

**Takeaway:** One problem. One workflow. One solution. One measurable impact.

**Transition:** Q&A — leave this composition on screen.

**Next:** Q&A — leave the closing composition on screen.
