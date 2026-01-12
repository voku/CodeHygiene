import { DiffSection } from './types';

export const BLOG_CONTENT: DiffSection[] = [
  {
    id: 'ch1_infection',
    chapterTitle: 'Chapter 1 – The Infection Starts With You',
    context: 'You build on solid layers (Linux, PHP), but the 5% of code you wrote yourself is the infection vector. It encodes assumptions instead of contracts.',
    leftContent: {
      label: 'The Fragile Glue',
      text: `We assume the environment is perfect. We skip checks because "we know" the data flow. This code is the 5% that breaks the 95%.

\`\`\`javascript
// data_processor.js
function processUserUpload(file) {
  // ASSUMPTION: File always exists
  // ASSUMPTION: Format is always CSV
  const lines = file.content.split('\\n');
  
  // Implicit trust in the "happy path"
  // If this fails, the whole stack panics.
  const userId = lines[0].split(',')[0];
  
  return db.update(userId, { 
    status: 'active' 
  });
}
\`\`\``,
      tags: ['Implicit Trust', 'Happy Path', 'Fragile']
    },
    rightContent: {
      label: 'The Hygienic Contract',
      text: `We treat our own code as the primary risk. We validate inputs at the border to prevent contaminating the stable system.

\`\`\`typescript
// data_processor.ts
function processUserUpload(input: unknown) {
  // 1. Sanitize the boundary
  if (!isValidFile(input)) {
    throw new ValidationError("Invalid Input");
  }

  // 2. Enforce the Contract
  const result = parseCsvSafe(input.content);
  
  if (result.isErr()) {
    // Handle infection gracefully
    return logger.warn("Malform CSV", result.error);
  }

  return db.update(result.value.id, { 
    status: 'active' 
  });
}
\`\`\``,
      tags: ['Validation', 'Boundaries', 'Safety']
    }
  },
  {
    id: 'ch2_testing',
    chapterTitle: 'Chapter 2 – Testing Isn’t Optional',
    context: 'Testing is not tech debt. It is the soap. If you skip tests, you are gambling that nothing goes wrong. That is negligence, not engineering.',
    leftContent: {
      label: 'Manual Confidence',
      text: `We rely on memory and manual checks. We treat testing as an optional "afterthought" if there is time.

\`\`\`javascript
// logic.js
function calculateTax(amount) {
  return amount * 0.2;
}

// "I tested this locally, it works."
// "Just merge it, we'll fix bugs later."
// "The QA team will catch edge cases."
\`\`\``,
      tags: ['Negligence', 'Manual', 'Risk']
    },
    rightContent: {
      label: ' codified Hygiene',
      text: `We encode the hygiene into the codebase. The tests prove the logic is sterile before it touches production.

\`\`\`typescript
// logic.test.ts
describe('Tax Calculator', () => {
  it('applies standard rate', () => {
    expect(calculateTax(100)).toBe(20);
  });

  it('handles zero gracefully', () => {
    expect(calculateTax(0)).toBe(0);
  });
  
  it('throws on negative input', () => {
    expect(() => calculateTax(-10)).toThrow();
  });
});
\`\`\``,
      tags: ['Unit Tests', 'Regression', 'Proof']
    }
  },
  {
    id: 'ch3_trust',
    chapterTitle: 'Chapter 3 – Trust Is Earned Through Testing',
    context: 'You wouldn’t install a library with no tests. Why ship your own code like that? Internal code should be treated with the same scrutiny as Open Source.',
    leftContent: {
      label: 'Hidden Sprawl',
      text: `Internal utilities often become messy dumping grounds. Side effects, global state, and undocumented behavior are tolerated because "only we use it."

\`\`\`php
// Utils.php
class Utils {
  public static function doItAll() {
    global $db; // Hidden dependency
    
    // Side effect: Modifies global state
    $_SESSION['count']++;
    
    // Magic numbers and undocumented logic
    return $db->query("SELECT * FROM t WHERE x=1");
  }
}
\`\`\``,
      tags: ['Spaghetti', 'Side Effects', 'Opaque']
    },
    rightContent: {
      label: 'Open Source Standard',
      text: `We build internal modules as if they were public libraries. Clean interfaces, dependency injection, and clear documentation earn trust.

\`\`\`php
// OrderService.php
class OrderService {
  private $repo;

  // Explicit Dependencies
  public function __construct(OrderRepository $repo) {
    $this->repo = $repo;
  }

  /**
   * Retrieves active orders.
   * @throws DbException
   */
  public function getActive(): Collection {
    return $this->repo->findActive();
  }
}
\`\`\``,
      tags: ['Dependency Injection', 'Clean', 'Trust']
    }
  },
  {
    id: 'ch4_culture',
    chapterTitle: 'Chapter 4 – Culture Eats Checklists for Breakfast',
    context: 'Tiredness is predictable. Relying on willpower fails at 2:00 AM. Systems must enforce hygiene when humans are too tired to care.',
    leftContent: {
      label: '2:00 AM Heroism',
      text: `When pressure mounts, we bypass the process. We log into servers directly. We are "heroes" fixing the build, but we are bypassing the safety protocols.

\`\`\`bash
# The Firefighting History
$ ssh root@prod-api-01
$ vim /var/www/src/Controller.php
# "Quick fix, don't tell anyone"
$ systemctl restart php-fpm
# "It works! I'm a genius."
\`\`\``,
      tags: ['Firefighting', 'Bypass', 'Unstable']
    },
    rightContent: {
      label: 'Boring Systems',
      text: `We build systems that withstand human fatigue. CI is the sink that forces us to wash our hands, even when we are in a rush.

\`\`\`yaml
# .github/workflows/hygiene.yml
name: Enforce Hygiene
on: [push]

jobs:
  sterilize:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Static Analysis
        run: ./vendor/bin/phpstan analyse
      - name: Unit Tests
        run: ./vendor/bin/phpunit
      - name: Deploy (Only if Sterile)
        if: success()
        run: ./deploy.sh
\`\`\``,
      tags: ['CI/CD', 'Automation', 'Gates']
    }
  }
];

export const CONCLUSIONS = [
  "Your custom code is the infection vector.",
  "Testing is hygiene, not heroism.",
  "Treat internal code like untrusted open source.",
  "Culture is defined by what you automate.",
  "Good code is boring. Safe code is essential."
];