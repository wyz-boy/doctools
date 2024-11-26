import click

from .author_mode import author_mode
from .hdl_render import hdl_render
from .hdl_gen import hdl_gen
from .aggregate import aggregate
from .custom_doc import custom_doc


@click.group()
def entry_point():
    """
    CLI to provide entry points to adi_doctools methods.
    """
    pass


commands = [
    author_mode,
    hdl_render,
    hdl_gen,
    aggregate,
    custom_doc
]

for cmd in commands:
    entry_point.add_command(cmd)
