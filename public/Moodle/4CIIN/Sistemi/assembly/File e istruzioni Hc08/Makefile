
%.s19: %.rel
	if [ -x /usr/bin/aslink ]; \
	then \
		( echo -s ; echo $< ; echo -e ) | aslink -c > /dev/null; \
		mv $*.S19 $*.s19; \
	else \
		( echo -s ; echo $< ; echo -e ) | sdld -c > /dev/null; \
	fi

%.rel : %.asm
	if [ -x /usr/bin/as-hc08 ]; \
	then \
		as-hc08 -lpo $< ;\
	else \
		sdas6808 -lpo $< ;\
	fi

all: ese.s19
ese.s19: ese.rel
ese.rel: ese.asm
clean:
	rm ese.rel ese.s19 ese.lst
