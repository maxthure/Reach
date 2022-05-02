#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    params = []
    if sys.argv[len(sys.argv) - 2] == "--cwd":
        print("Changing directory")
        os.chdir(sys.argv[len(sys.argv) - 1])
        for c in range(0, len(sys.argv) - 2):
            params.append(sys.argv[c])
    else:
        for p in sys.argv:
            params.append(p)

    print(params)

    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(params)


if __name__ == '__main__':
    main()
